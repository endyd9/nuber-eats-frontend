import { gql, useMutation, useSubscription } from "@apollo/client";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import {
  CookedOrdersSubscription,
  TakeOrderMutation,
  TakeOrderMutationVariables,
} from "../../gql/graphql";
import { Link, useHistory } from "react-router-dom";

interface Coords {
  lat: number;
  lng: number;
}

interface PositionProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const COOKED_ORDERS = gql`
  subscription cookedOrders {
    cookedOrders {
      id
      status
      total
      driver {
        email
      }
      customer {
        email
      }
      restaurant {
        name
      }
    }
  }
`;

const TAKE_ORDER = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

const CurrentPosition: React.FC<PositionProps> = ({ lat, lng }) => (
  <div
    //@ts-ignore
    lat={lat}
    lng={lng}
    className="h-8 w-8 rounded-full bg-lime-400 flex items-center justify-center text-xl text-white"
  >
    N
  </div>
);

export const Dashboard = () => {
  const [coords, setCoords] = useState<Coords>({
    lat: 35.9292258,
    lng: 128.6342916,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

  const onSucces = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  const onAPILoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(coords.lat, coords.lng));
    setMap(map);
    setMaps(maps);
  };

  const makePath = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "lime",
        },
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(coords.lat, coords.lng),
          },
          destination: {
            location: new google.maps.LatLng(
              coords.lat + 0.05,
              coords.lng + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(coords.lat, coords.lng));
      const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode(
      //     { location: new google.maps.LatLng(coords.lat, coords.lng) },
      //     (results, status) => {
      //       console.log(results, status);
      //     }
      //   );
    }
  }, [coords.lat, coords.lng]);
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  const { data } = useSubscription<CookedOrdersSubscription>(COOKED_ORDERS);
  useEffect(() => {
    if (data?.cookedOrders.id) {
      makePath();
    }
  }, [data]);

  const history = useHistory();
  const onCompleted = () => {
    if (!data) return;
    history.push(`orders/${data.cookedOrders.id}`);
  };
  const [takeOrederMutation] = useMutation<
    TakeOrderMutation,
    TakeOrderMutationVariables
  >(TAKE_ORDER, {
    onCompleted,
  });

  const onAcceptClick = (orderId: number) => {
    takeOrederMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };

  return (
    <div className="">
      <div
        className=" bg-gray-900"
        style={{ width: window.innerWidth, height: "75vh" }}
      >
        <GoogleMapReact
          defaultZoom={16}
          center={{ lat: coords.lat, lng: coords.lng }}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP! }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onAPILoaded}
        >
          <CurrentPosition lat={coords.lat} lng={coords.lng} />
        </GoogleMapReact>
      </div>
      <div className="max-w-screen-md mx-auto bg-white relative -top-10 shadow-lg py-8 px-5 text-center">
        {data?.cookedOrders ? (
          <>
            <h1 className="text-3xl font-medium">
              새로운 주문이 배정되었습니다.
            </h1>
            <h4 className="my-3 text-2xl font-medium">
              {data.cookedOrders.restaurant?.name}
            </h4>
            <button
              onClick={() => onAcceptClick(data.cookedOrders.id)}
              className="btn w-full mt-5 block"
            >
              수락하기
            </button>
          </>
        ) : (
          <h1 className="text-3xl font-medium">가까운 배달을 찾는 중...</h1>
        )}
      </div>
    </div>
  );
};
