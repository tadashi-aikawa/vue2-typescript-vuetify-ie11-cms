/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserStore from '~/store/UserStore'
import WorldStore from '~/store/WorldStore'
import QuestStore from '~/store/QuestStore'
import GoalStore from '~/store/GoalStore'
import CityStore from '~/store/CityStore'

let userStore: UserStore
let worldStore: WorldStore
let goalStore: GoalStore
let cityStore: CityStore
let questStore: QuestStore

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserStore, store)
  worldStore = getModule(WorldStore, store)
  goalStore = getModule(GoalStore, store)
  cityStore = getModule(CityStore, store)
  questStore = getModule(QuestStore, store)
}

export {
  initialiseStores,
  userStore,
  worldStore,
  questStore,
  goalStore,
  cityStore,
}
