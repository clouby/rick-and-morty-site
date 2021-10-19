<template>
  <div class="border border-green-100 shadow rounded-md p-4 h-50">
    <div :class="[item.id ? '' : 'animate-pulse', 'flex', 'space-x-4']">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="
          h-24
          w-24
          inline-block
          rounded-full
          shadow-lg
          ring-2 ring-green-200
        "
      />
      <div v-else class="rounded-full bg-green-100 h-24 w-24"></div>
      <div class="flex-1 space-y-1 py-1">
        <span
          v-if="item.name"
          class="
            block
            text-green-400 text-left
            font-bold
            subpixel-antialiased
            text-xl
          "
        >
          {{ item.name }}
        </span>
        <div v-else class="h-4 bg-green-100 rounded w-3/4"></div>
        <div class="space-y-1">
          <div v-if="item.status" class="flex items-start flex-col">
            <span class="text-left text-sm font-normal text-gray-400"
              >status</span
            >
            <p class="text-left text-lg capitalize text-black font-semibold">
              {{ item.status }}
            </p>
          </div>
          <div v-else class="h-4 bg-green-100 rounded"></div>

          <div class="h-4 bg-green-100 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  setup({ item = {} }) {
    return {
      item,
    };
  },
};
</script>
