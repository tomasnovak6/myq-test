import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GroupsService } from '../services/groups.service';
import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects {

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.loadGroups),
    mergeMap(() => this.groupsService.getGroups().pipe(
      map(groups => GroupActions.loadGroupsSuccess({ groups })),
      catchError(error => of(GroupActions.loadGroupsFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService
  ) {}
}
