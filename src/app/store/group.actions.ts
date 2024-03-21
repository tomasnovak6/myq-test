import { createAction, props } from '@ngrx/store';
import { IGroups } from '../model/i-groups';

export const loadGroups = createAction('[Groups Component] Load Groups');
export const loadGroupsSuccess = createAction('[Groups Component] Load Groups Success', props<{ groups: IGroups[] }>());
export const loadGroupsFailure = createAction('[Groups Component] Load Groups Failure', props<{ error: any }>());


