import {APIProvider, Map} from '@vis.gl/react-google-maps';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const GoogleMap = () => {
  return (
    <div className='flex justify-end bg-gray-300'>
      <APIProvider 
        apiKey={GOOGLE_API_KEY} 
        onLoad={() => console.log('Maps API has loaded.')}
      >
        <Map
          style={{width: '80vw', height: '50vh'}}
          defaultCenter={{lat: 34.0549, lng: -118.2426}}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        />
      </APIProvider>
    </div>
  )
};
