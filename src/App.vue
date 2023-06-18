<script setup lang="ts">
import UserCard from './components/UserCard.vue'
import {onMounted, ref} from "vue";
import {useUsersStore} from "./store/users.ts";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import EmptyBlock from "./components/EmptyBlock.vue";

/**
 * @description The Page component with cards of user's information
 */

const store = useUsersStore()

const trigger = ref(null)

/**
 * @function makes a request to get the next pool of users
 */
const loadNextPage = () => {
  store.upCountPage()
      .then(() => {
        store.loadUsers()
      })

}


/**
 * @function checks for intersection and loading status and invokes a request to get the next pool of users
 */
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry?.isIntersecting && !store.isLoading) {
     loadNextPage()
    }
  })
}
/**
 * @function fills in the list of users when mounting the component and adds an interceptor to reload the list of users
 */
onMounted(() => {
  store.loadUsers()
  const options = {
    root: null as unknown as Document,
    rootMargin: "0px" as string,
    threshold: 1 as number
  };
  const observer = new IntersectionObserver(callback, options);
  const observerHtmlElement = trigger.value as unknown as Element
  observer.observe(observerHtmlElement);
})

</script>

<template>
  <div
    ref="wrapper"
    class="page pb-6"
  >
    <div class="min-h-screen">
      <ul
        v-if="store.userList?.length"
        role="list"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="person in store.userList"
          :key="person.email"
          class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <UserCard v-bind="person" />
        </li>
      </ul>
      <EmptyBlock v-if="!store.userList?.length && !store.isLoading" />
      <LoadingIndicator
        v-if="store.isLoading"
        class="mt-5"
      />
    </div>

    <div ref="trigger" />
  </div>
</template>
