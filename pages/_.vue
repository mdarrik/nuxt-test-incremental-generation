<template>
  <CFlex
    as="article"
    justify="center"
    direction="column"
    align="center"
    w="full"
  >
    <h1>{{ title }}</h1>
    <time :datetime="imageDate">{{ imageDate }}</time>
    <CBox as="figure">
      <CBox as="picture">
        <source
          :srcset="imgHDSrc"
          media="(prefers-reduced-data: no-preference)"
        />
        <CBox as="img" :src="imgSrc" :alt="alt" mx="auto" d="block" />
      </CBox>
      <small v-if="copyright">Image Credit & Copyright: {{ copyright }} </small>
      <figcaption>
        {{ explanation }}
      </figcaption>
    </CBox>
    <footer>
      <CFlex :p="5" grid-gap="2">
        <CButton
          as="nuxt-link"
          c
          shadow="md"
          :to="previousDate"
          mr="2"
          color="cyan.700"
        >
          <CIcon name="chevron-left" />
          {{ previousDate }}
        </CButton>
        <CButton as="nuxt-link" color="cyan.700" shadow="md" to="/">
          Home
        </CButton>
        <template v-if="imageDate !== latest">
          <CButton as="nuxt-link" :to="nextDate" color="cyan.700" shadow="md">
            {{ nextDate }}
            <CIcon name="chevron-right" />
          </CButton>
        </template>
      </CFlex>
      All content except alt text provided by
      <CLink
        href="https://api.nasa.gov/"
        color="cyan.700"
        text-decoration="underline"
      >
        NASA & their Picture of the Day API
      </CLink>
    </footer>
  </CFlex>
</template>
<script>
export default {
  asyncData({ payload, params }) {
    if (!payload) {
      return fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${params.pathMatch}`
      )
        .then((res) => res.json())
        .then((body) => {
          const { title, date, copyright, url, hdurl, explanation } = body
          const previousDate = new Date(
            new Date().setDate(new Date(date).getDate() - 1)
          )
          const nextDate = new Date(
            new Date().setDate(new Date(date).getDate() + 1)
          ).toLocaleDateString('en-CA')
          return {
            title,
            imageDate: date,
            copyright,
            imgSrc: url,
            imgHDSrc: hdurl,
            previousDate:
              previousDate >= new Date('01/01/2020')
                ? previousDate.toLocaleDateString('en-CA')
                : null,
            nextDate,
            explanation,
            latest: new Date().toLocaleDateString('en-CA'),
            alt: title,
          }
        })
    }
    const {
      title,
      date,
      copyright,
      url,
      hdurl,
      alt,
      explanation,
      latest,
    } = payload
    const nextDate = new Date(
      new Date().setDate(new Date(date).getDate() + 1)
    ).toLocaleDateString('en-CA')
    const previousDate = new Date(
      new Date().setDate(new Date(date).getDate() - 1)
    )
    return {
      title,
      imageDate: date,
      copyright,
      imgSrc: url,
      imgHDsrc: hdurl,
      previousDate:
        previousDate >= new Date('01/01/2020')
          ? previousDate.toLocaleDateString('en-CA')
          : null,
      nextDate,
      alt: alt ?? title,
      explanation,
      latest,
    }
  },
}
</script>
