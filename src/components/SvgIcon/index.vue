<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
defineOptions({ name: 'SvgIcon' });
const props = withDefaults(
  defineProps<{
    prefix?: string;
    name: string;
    color?: string;
  }>(),
  {
    prefix: 'icon',
    color: '#333',
  },
);
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
