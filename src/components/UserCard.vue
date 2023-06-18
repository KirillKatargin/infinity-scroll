<script setup lang="ts">
import {computed} from 'vue'
import {IPerson} from "./types";
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'


/**
 * @typedef {IPerson} users object to be used as a blueprint to extract user details
 */
const props = defineProps<IPerson>()

/**
 * getting full username
 */
const computedFullName = computed(() => {
  return props?.name?.first || '' + props?.name?.last || ''
})

</script>

<template>
    <div class="card-wrapper">
      <div class="flex flex-1 flex-col p-8">
        <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" :src="props?.picture?.large || props?.picture?.medium" alt="" />
        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ computedFullName || '' }}</h3>
        <dl class="mt-1 flex flex-grow flex-col justify-between">
          <dt class="sr-only">Title</dt>
          <dd class="text-sm text-gray-500">{{ props.location?.city || '-' }}</dd>
          <dt class="sr-only">Role</dt>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div v-if="props?.email" class="flex w-0 flex-1">
            <a :href="`mailto:${props?.email}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
              <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              Email
            </a>
          </div>
          <div v-if="props?.phone" class="-ml-px flex w-0 flex-1">
            <a :href="`tel:${props?.phone}`" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
              <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
</template>
