//  Returns distance in meters between two latlngs
export const calcDistance = (fromLat, fromLng, toLat, toLng) => {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(fromLat, fromLng),
    new window.google.maps.LatLng(toLat, toLng)
  )
}

export const calcTimeGap = (distance, velocity) => {
  return distance / (velocity * 60)
}

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
      console.warn("Get elevation failure; status:", status)
    }
    return elevations
  })
}

export const getPathElevation = pathArr => {
  return new Promise((resolve, reject) => {
    window.elevation.getElevationAlongPath(
      {
        path: pathArr,
        samples: 128
      },
      (result, status) => {
        if (status === "OK") {
          let sum = 0
          result.forEach(elev => {
            sum += elev.elevation
          })
          resolve(sum / result.length)
        } else {
          reject(status)
        }
      }
    )
  })
}

export const calcTotalDistance = latLngArray => {
  return new Promise((resolve, reject) => {
    let G_LatLngs = latLngArray.map(latLng => {
      return new window.google.maps.LatLng(latLng.lat, latLng.lng)
    })

    let distance = window.google.maps.geometry.spherical.computeLength(
      G_LatLngs
    )
    if (distance === 0) {
      reject("Error")
    }
    resolve(distance)
  })
}
