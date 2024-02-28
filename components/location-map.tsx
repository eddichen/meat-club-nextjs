import { Map } from "@vis.gl/react-google-maps";

export const LocationMap = ({ children }: React.PropsWithChildren) => {
  return (
    <Map
      mapId="61baed150fa492b8"
      defaultCenter={{ lat: 51.5285262, lng: -0.2664021 }}
      defaultZoom={11}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {children}
    </Map>
  );
};
