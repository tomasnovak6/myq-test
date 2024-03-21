import { createReducer, on } from '@ngrx/store';
import * as GroupActions from './group.actions';
import { IGroups } from '../model/i-groups';

export const initialState: IGroups[] = [];

const _groupReducer = createReducer(
  initialState,
  on(GroupActions.loadGroupsSuccess, (state, { groups }) => groups)
);

export function groupReducer(state: IGroups[] | undefined, action: any): IGroups[] {
  return _groupReducer(state, action);
}
