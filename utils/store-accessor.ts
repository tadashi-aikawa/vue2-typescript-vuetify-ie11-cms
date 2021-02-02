/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserStore from '~/store/UserStore'
import WorldStore from '~/store/WorldStore'

let userStore: UserStore
let worldStore: WorldStore

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserStore, store)
  worldStore = getModule(WorldStore, store)
}

export { initialiseStores, userStore, worldStore }
