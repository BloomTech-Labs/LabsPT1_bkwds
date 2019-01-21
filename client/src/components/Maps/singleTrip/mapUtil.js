import { totalmem } from "os"

//  Returns distance in meters between to latlngs
export const calcDistance = (fromLat, fromLng, toLat, toLng) => {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(fromLat, fromLng),
    new window.google.maps.LatLng(toLat, toLng)
  )
}

// Input: array of objects with lat: Number, lng:Number properties
// Return: distance between input pairs in meters
export const calcTotalDistance = latLngArray => {
  let G_LatLngs = latLngArray.map(latLng => {
    return window.google.maps.LatLng(latLng.lat, latLng.lng)
  })
  return window.google.maps.geometry.spherical.computeLength(G_LatLngs)
}

//TODO - add elev_service to window?
//Returns an Elevation Object with a location(LatLng obhect),elevation,and resolution properties
export const getElevations = latLngArr => {
  let elevations
  const elev_service = new window.google.maps.ElevationService()
  let G_LatLngs = latLngArr.map(latLng => {
    return window.google.maps.LatLng(latLng.lat, latLng.lng)
  })

  elev_service.getElevationForLocations(G_LatLngs, (results, status) => {
    if (status === "OK") {
      elevations = results
    } else {
      console.log(status)
    }
    return elevations
  })
}
//Path arr is set of lat,lng object pairs, {lat:Number,lng:Number}
//TODO: global window elev_service
export const getPathElevation = pathArr => {
  let pathAverage
  const elev_service = new window.google.maps.ElevationService()
  elev_service.getElevationAlongPath(
    {
      path: pathArr,
      samples: 256
    },
    (result, status) => {
      if (status === "OK") {
        pathAverage = result.reduce((sum, val, index, arr) => {
          sum += val.elevation
          if (index === arr.length) {
            return sum / arr.length
          } else {
            return totalmem
          }
        }, 0)
      } else {
        console.log(status)
      }
    }
  )
  return pathAverage
}
