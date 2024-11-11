<template>
  <div class="massage">
    <p class="massage__text">
      <slot></slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
.massage {
  padding: 3rem;

  &__text {
    font-size: 2.8rem;
    line-height: 3rem;
    font-weight: 900;
  }
}
</style>
