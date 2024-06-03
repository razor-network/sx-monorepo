<script setup lang="ts">
import { REDIRECT_URL } from '@/networks/evm/constants';
import draggable from 'vuedraggable';

const uiStore = useUiStore();
const spacesStore = useSpacesStore();
</script>

<template>
  <div class="w-[72px] border-r fixed left-0 top-0 bottom-0 text-center">
    <router-link :to="{ path: REDIRECT_URL }" class="h-[72px] block">
      <img
        src="https://ipfs.io/ipfs/QmRXoxMnz9ViWzQ7Ewg7dA8XtQoxp8gQ4cWjqj1Vk2ue2p/razor.png"
        class="inline-block my-4 w-[32px] h-[32px] text-skin-link"
      />
      <!-- <IH-stop class="inline-block my-4 w-[32px] h-[32px] text-skin-link" /> -->
    </router-link>
    <UiLoading v-if="!spacesStore.starredSpacesLoaded" />
    <draggable
      v-else
      v-model="spacesStore.starredSpaces"
      :delay="100"
      :delay-on-touch-only="true"
      :touch-start-threshold="35"
      :item-key="i => i"
      v-bind="{ animation: 200 }"
      class="space-y-3 p-2"
    >
      <template #item="{ element }">
        <router-link
          :to="{ name: 'space-overview', params: { id: `${element.network}:${element.id}` } }"
          class="block"
          @click="uiStore.sidebarOpen = false"
        >
          <UiTooltip :title="element.name" placement="right" :touch="false">
            <SpaceAvatar :space="element" :size="32" class="!rounded-[4px]" />
          </UiTooltip>
        </router-link>
      </template>
    </draggable>
  </div>
</template>
