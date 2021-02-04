/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserStore from '~/store/UserStore'
import WorldStore from '~/store/WorldStore'
import QuestStore from '~/store/QuestStore'

let userStore: UserStore
let worldStore: WorldStore
let questStore: QuestStore

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserStore, store)
  worldStore = getModule(WorldStore, store)
  questStore = getModule(QuestStore, store)
}

export { initialiseStores, userStore, worldStore, questStore }
