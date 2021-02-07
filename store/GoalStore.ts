import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Goal } from '~/domain/quests/entity/Goal'
import { Status } from '~/utils/status'
import { World } from '~/domain/quests/entity/World'
import { AllError } from '~/app/GoalService'
import { GoalServiceFixedImpl } from '~/app/GoalServiceFixedImpl'
import { groupBy } from '~/utils/dont-need-lodash'

const goalService = new GoalServiceFixedImpl()

@Module({ name: 'GoalStore', namespaced: true, stateFactory: true })
export default class GoalStore extends VuexModule {
  private goals: Goal[] | null = null
  status: Status = 'init'
  error: AllError | null = null

  private get goalsByWorld(): { [worldName: string]: Goal[] } {
    return groupBy(this.goals ?? [], (x) => x.worldName)
  }

  get getGoalsByWorld() {
    return (world: World): Goal[] => this.goalsByWorld[world.name] ?? []
  }

  @Mutation
  private loading() {
    this.error = null
    this.status = 'loading'
  }

  @Mutation
  private success(goals: Goal[]) {
    this.error = null
    this.goals = goals
    this.status = 'success'
  }

  @Mutation
  private failure(error: AllError) {
    this.error = error
    this.goals = null
    this.status = 'failure'
  }

  @Action({ rawError: true })
  async fetchGoals(): Promise<void> {
    this.loading()
    const goalsOrErr = await goalService.all()
    goalsOrErr.biMap(this.failure, this.success)
  }
}
