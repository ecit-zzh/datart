/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Relation,
  ServerRelation,
  ServerWidget,
  Widget,
} from 'app/pages/DashBoardPage/pages/Board/slice/types';
import {
  beta0,
  convertWidgetRelationsToObj,
  migrateWidgets,
} from '../migrateWidgets';

describe('test migrateWidgets ', () => {
  test('should return null  when widget.config.type === filter', () => {
    const widget1 = {
      config: {
        type: 'filter',
      },
    };
    expect(beta0(widget1 as Widget)).toBeNull();
  });
  test('should return self  when widget.config.type !== filter', () => {
    const widget2 = {
      config: {
        type: 'chart',
      },
    } as Widget;
    expect(beta0(widget2 as Widget)).toEqual(widget2);
  });

  test('convertWidgetRelationsToObj parse Relation.config', () => {
    const relations1 = [
      {
        targetId: '11',
        config: '{}',
        sourceId: '22',
      },
    ] as ServerRelation[];
    const relations2 = [
      {
        targetId: '11',
        config: {},
        sourceId: '22',
      },
    ] as ServerRelation[];
    expect(convertWidgetRelationsToObj(relations1)).toMatchObject(relations2);
  });

  test('should get new target version after adjust widgets before save', () => {
    const targetVersion = 'test_version';
    const widget1 = {
      config: '{}',
    } as ServerWidget;
    const widget2 = {
      config: '{"version":"rrr"}',
    } as ServerWidget;
    const tWidget = {
      config: {
        version: targetVersion,
      },
      relations: [] as Relation[],
    } as Widget;

    const widgets: ServerWidget[] = [widget1, widget2];

    expect(migrateWidgets(widgets, { version: targetVersion })).toMatchObject([
      tWidget,
      tWidget,
    ]);
  });
});
