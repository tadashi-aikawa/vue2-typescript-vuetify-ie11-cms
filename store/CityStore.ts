import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Goal } from '~/domain/quests/entity/Goal'
import { Status } from '~/utils/status'
import { City } from '~/domain/quests/entity/City'
import { CityServiceFixedImpl } from '~/app/CityServiceFixedImpl'
import { AllError } from '~/app/CityService'
import { groupBy } from '~/utils/dont-need-lodash'

const cityService = new CityServiceFixedImpl()

@Module({ name: 'CityStore', namespaced: true, stateFactory: true })
export default class CityStore extends VuexModule {
  private cities: City[] | null = null
  status: Status = 'init'
  error: AllError | null = null

  private get citiesByGoal(): { [goalName: string]: City[] } {
    return groupBy(this.cities ?? [], (x) => x.goalName)
  }

  get getCitiesByGoal() {
    return (goal: Goal): City[] => this.citiesByGoal[goal.name] ?? []
  }

  @Mutation
  private loading() {
    this.error = null
    this.status = 'loading'
  }

  @Mutation
  private success(cities: City[]) {
    this.error = null
    this.cities = cities
    this.status = 'success'
  }

  @Mutation
  private failure(error: AllError) {
    this.error = error
    this.cities = null
    this.status = 'failure'
  }

  @Action({ rawError: true })
  async fetchCities() {
    this.loading()
    const citiesOrErr = await cityService.all()
    citiesOrErr.biMap(this.failure, this.success)
  }
}
