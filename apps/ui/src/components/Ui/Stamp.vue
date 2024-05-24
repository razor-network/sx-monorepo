<script setup lang="ts">
import { getStampUrl } from '@/helpers/utils';

withDefaults(
  defineProps<{
    type?: 'avatar' | 'space' | 'space-sx' | 'space-cover-sx' | 'token';
    id: string;
    size?: number;
    width?: number;
    height?: number;
    ipfs?: string;
    cb?: string;
  }>(),
  {
    type: 'avatar',
    size: 22
  }
);
</script>

<template>
  <img
    :src="getStampUrl(type, id, width && height ? { width, height } : size, '', ipfs, cb)"
    class="rounded-full inline-block bg-skin-border"
    :style="
      !width && !height
        ? {
            width: `${size}px`,
            height: `${size}px`
          }
        : {}
    "
  />
</template>
