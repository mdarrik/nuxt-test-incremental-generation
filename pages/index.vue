<template>
  <div class="container">
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      flex-dir="column"
      justify-content="center"
      align-items="center"
    >
      <CHeading text-align="center" mb="4">
        NASA's Pictures of the Day
      </CHeading>
      <SpaceSvg display="block" w="md" />
      <CFlex justify="center" direction="column" align="center">
        <CBox mb="3">
          <CButton
            as="nuxt-link"
            :to="latestPictureLinkDate"
            color="cyan.700"
            shadow="md"
          >
            See the latest picture of 2020 ({{ latestPictureDisplayDate }})
          </CButton>
        </CBox>
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
export default {
  name: 'App',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  asyncData({payload}) {
    const latestPictureLinkDate = payload ?? new Date(new Date().setDate(new Date().getDate() -1)).toLocaleDateString('en-CA');
    return {latestPictureLinkDate}
  },
  data () {
    return {
      latestPictureLinkDate: new Date(new Date().setDate(new Date().getDate() -1)).toLocaleDateString('en-CA'),
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  computed: {
    latestPictureDisplayDate() {
      const latestPicLinkDate = new Date(this.latestPictureLinkDate);
      return latestPicLinkDate.toLocaleDateString();
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  }
}
</script>
