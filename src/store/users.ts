import {defineStore} from "pinia";
import {IPerson} from "../components/types";
import api from "../api";
import {toast} from "vue3-toastify";

export const useUsersStore = defineStore({
    id: 'users',
    state: () => {
        /**
         * @typedef {IPerson} userList - users object to be used as a blueprint to extract user details
         * @param {number} resultQuantity - number of requested users
         * @param {number} page - current page
         * @param {boolean} isLoading - loading state
         */
        return {
            userList: [] as IPerson[],
            resultQuantity: 12 as number,
            page: 1 as number,
            isLoading: false as boolean
        }
    },
    actions: {

        upCountPage() {
            /**
             * responsible for calculating the next page
             * @param {number} page - getting the next page
             */
            return new Promise((resolve) => {
                this.page = ++this.page
                resolve(this.page)
            })

        },
        loadUsers() {
            /**
             * executes a list request
             * @param {number} results - number of requested users
             * @param {number} page - next page
             */
            this.isLoading = true
            api.get('/', {
                params: {
                    results: this.resultQuantity,
                    page: this.page
                }
            })
                .then((res) => {
                    if(res?.data?.results?.length) {
                        this.userList = [...this.userList, ...res.data.results]
                    }
                })
                .catch((err) => {
                    console.error(err)
                    toast.error(err?.message || 'Ошибка получения данных');
                })
                .finally(() => {
                    this.isLoading = false
                })
        }
    }
})