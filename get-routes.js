import fetch from 'node-fetch'
const altText = require('./image-alts.json')

const nasaAPIKey = process.env.NASA_API_KEY || 'DEMO_KEY'
const nasaAPI = new URL(
  `https://api.nasa.gov/planetary/apod?api_key=${nasaAPIKey}`
)

const buildPayload = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : false

export default async function () {
  // if buildPayload exists, it's an incremental build
  if (buildPayload) {
    // fetch the data for the date in the build payload.
    const nasaApiSearchParams = nasaAPI.searchParams
    nasaApiSearchParams.set(
      'date',
      new Date(buildPayload.date).toLocaleDateString('en-CA')
    )
    const todayPicture = await fetch(nasaAPI).then((resp) => resp.json())
    // generate just the 1 page from the payload.
    return [
      {
        route: todayPicture.date,
        payload: {
          ...todayPicture,
          alt: altText[todayPicture.date],
          latest: buildPayload.date,
        },
      },
    ]
  }
  // otherwise, fetch all Pictures from January 1, 2020 to the latest of either Yesterday or 12/31/2020
  const yearStart = new Date('01-01-2020')
  const yearEnd = new Date('12-31-2020')
  const today = new Date()
  const yesterday = new Date(new Date().setDate(today.getDate() - 1))
  const endDate = new Date(Math.min(yearEnd, yesterday))
  nasaAPI.searchParams.set('start_date', yearStart.toLocaleDateString('en-CA'))
  nasaAPI.searchParams.set('end_date', endDate.toLocaleDateString('en-CA'))
  const picturesOfTheDay = await fetch(nasaAPI).then((resp) => resp.json())
  const routes = picturesOfTheDay.map((pic) => ({
    route: pic.date,
    payload: {
      ...pic,
      alt: altText[pic.date],
      latest: endDate.toLocaleDateString('en-CA'),
    },
  }))
  return routes
}
