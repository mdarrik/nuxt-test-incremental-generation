<template>
  <CBox
    as="aside"
    border-width="2px"
    rounded="lg"
    :max-w="['md', 'md', 'xl']"
    p="4"
    shadow="sm"
    bg="gray.50"
  >
    <p>
      This project is mostly to explore incrementally generating pages with
      Nuxt. It's set up so that a deploy to only build the page for today's
      image can be triggered via a webhook.
    </p>
    <p>
      You can
      <CLink
        href="https://github.com/mdarrik/nuxt-test-incremental-generation"
        text-decoration="underline"
        color="cyan.700"
      >
        see the source code here.
      </CLink>
      To read more about it, checkout my
      <CLink
        href="https://darrik.dev/nuxt-incremental-page-generation"
        text-decoration="underline"
        color="cyan.700"
      >
        article on incremental page generation with Nuxt
      </CLink>
    </p>
  </CBox>
</template>

<script>
export default {}
</script>
