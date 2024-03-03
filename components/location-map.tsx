import { Map } from "@vis.gl/react-google-maps";

export const LocationMap = ({ children }: React.PropsWithChildren) => {
  return (
    <Map
      mapId="61baed150fa492b8"
      defaultCenter={{ lat: 51.5079629, lng: -0.1424906 }}
      defaultZoom={12}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {children}
    </Map>
  );
};
