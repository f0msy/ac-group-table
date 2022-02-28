import { tableGroups } from '../stores/rows.store.js';
import { tableData } from '../stores/data.store.js';
import { get } from 'svelte/store';
import ProgressBar from '@badrap/bar-of-progress';
const progress = new ProgressBar();
let fixedColumnsCount;

export function setProgressBar(value) {
  if (value === 'start') {
    progress.start();
    return;
  }

  if (value === 'finish') {
    progress.finish();
    return;
  }
}

function parseDataFromServer(result) {
  fixedColumnsCount = result.fixedColumnsCount;

  result.groups.map((g) => {
    let orderedGroupCells = [];
    result.headers.forEach((h) => {
      const cell = g.cells.find((c) => c.columnId == h.id);
      orderedGroupCells.push(cell);
    });
    g.cells = orderedGroupCells;

    g.rows.map((r) => {
      let orderedRowCells = [];
      result.headers.forEach((h) => {
        const cell = r.cells.find((c) => c.columnId === h.id);
        orderedRowCells.push(cell);
      });
      r.cells = orderedRowCells;
      return r;
    });
    return g;
  });

  result.groups.map((g) => {
    g.fixedCells = [];
    g.cells.map((c, i) => {
      if (i < fixedColumnsCount) {
        g.fixedCells.push(c);
      }
    });
    g.cells = g.cells.slice(fixedColumnsCount);

    g.rows.map((r) => {
      r.fixedCells = [];
      r.cells.map((c, i) => {
        if (i < fixedColumnsCount) {
          r.fixedCells.push(c);
        }
      });
      r.cells = r.cells.slice(fixedColumnsCount);
      return r;
    });
    return g;
  });

  result.groups.map((g) => {
    g.cells.map((c) => {
      c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
      return c;
    });

    g.fixedCells.map((c) => {
      c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
      return c;
    });

    return g;
  })

  result.groups.map((g) => {
    g.fixedCells.map((c, i) => {
      if (i == 0) {
        c.left = 40;
        return c;
      }
      c.left = g.fixedCells.reduce((acc, curr, index) => {
        if (index < i) {
          return acc + curr.width;
        }
        return acc;
      }, 40);
      return c;
    });

    g.rows.map((r) => {
      r.cells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      r.fixedCells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      return r;
    });
  
    g.rows.map((r) => {
      r.fixedCells.map((c, i) => {
        if (i == 0) {
          c.left = 40;
          return c;
        }
        c.left = r.fixedCells.reduce((acc, curr, index) => {
          if (index < i) {
            return acc + curr.width;
          }
          return acc;
        }, 40);
        return c;
      });
      return r;
    });

    return g;
  });

  if(result?.totals) {
    result.totals.map((t) => {
      let orderedCells = [];
      result.headers.forEach((h) => {
        const cell = t.cells.find((c) => c.columnId === h.id);
        orderedCells.push(cell);
      });
      t.cells = orderedCells;
      return t;
    });

    result.totals.map((t) => {
      t.fixedCells = [];
      t.cells.map((c, i) => {
        if (i < fixedColumnsCount) {
          t.fixedCells.push(c);
        }
      });
      t.cells = t.cells.slice(fixedColumnsCount);
      return t;
    });
  }

  result.fixedHeaders = [];
  result.headers.map((h, i) => {
    if (i < fixedColumnsCount) {
      result.fixedHeaders.push(h);
    }
    return h;
  });
  result.headers = result.headers.slice(fixedColumnsCount);

  result.fixedTitles = [];
  result.titles.map((t, i) => {
    if (i < fixedColumnsCount) {
      result.fixedTitles.push(t);
    }
    return t;
  });
  result.titles = result.titles.slice(fixedColumnsCount);

  function findCellWidth(columnId) {
    const headersWidth = result?.headers?.find((e) => e.id === columnId)?.width;
    const fixedHeadersWidth = result?.fixedHeaders?.find(
      (e) => e.id === columnId
    )?.width;

    return headersWidth ? headersWidth : fixedHeadersWidth;
  }

  if(result?.totals) { 
    result.totals.map((t) => {
      t.cells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      t.fixedCells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      return t;
    });
  
    result.totals.map((t) => {
      t.fixedCells.map((c, i) => {
        if (i == 0) {
          c.left = 40;
          return c;
        }
        c.left = t.fixedCells.reduce((acc, curr, index) => {
          if (index < i) {
            return acc + curr.width;
          }
          return acc;
        }, 40);
        return c;
      });
      return t;
    });
  }

  tableGroups.set(result.groups)
  tableData.set(result);

  return result;
}

function prepareBody() {
  const data = get(tableData);
  const body = get(tableGroups);

  body.map((b) => {
    const fixedGroupCells = data.groups.find((g) => g.groupId === b.groupId)?.fixedCells;
    if (fixedGroupCells) {
      b.cells = [...fixedGroupCells, ...b.cells];
      delete b.fixedCells;
    }

    const groupRows = data.groups.find((g) => g.groupId === b.groupId).rows
    groupRows.map(r => {
      const fixedCells = r?.fixedCells
      if (fixedCells) {
        r.cells = [...fixedCells, ...r.cells];
        delete r.fixedCells;
      }
      return r;
    });
    b.rows = groupRows;
    
    return b;
  });

  return body;
}

function prepareRows(result, rows) {
  

  return rows;
}

function setGroupRows(groupId, rows) {
  tableData.update(result => {
    function findCellWidth(columnId) {
      const headersWidth = result?.headers?.find((e) => e.id === columnId)?.width;
      const fixedHeadersWidth = result?.fixedHeaders?.find(
        (e) => e.id === columnId
      )?.width;
  
      return headersWidth ? headersWidth : fixedHeadersWidth;
    }
    rows.map((r) => {
      let orderedRowCells = [];
      result?.fixedHeaders?.forEach((h) => {
        const cell = r.cells.find((c) => c.columnId === h.id);
        orderedRowCells.push(cell);
      });
  
      result.headers.forEach((h) => {
        const cell = r.cells.find((c) => c.columnId === h.id);
        orderedRowCells.push(cell);
      });
      r.cells = orderedRowCells;
      return r;
    });
  
    rows.map((r) => {
      r.fixedCells = [];
      r.cells.map((c, i) => {
        if (i < fixedColumnsCount) {
          r.fixedCells.push(c);
        }
      });
      r.cells = r.cells.slice(fixedColumnsCount);
      return r;
    });
  
    rows.map((r) => {
      r.cells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      r.fixedCells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      return r;
    });
  
    rows.map((r) => {
      r.fixedCells.map((c, i) => {
        if (i == 0) {
          c.left = 40;
          return c;
        }
        c.left = r.fixedCells.reduce((acc, curr, index) => {
          if (index < i) {
            return acc + curr.width;
          }
          return acc;
        }, 40);
        return c;
      });
      return r;
    });
    result.groups.find(g => g.groupId == groupId).rows = rows;
    console.log(result);
    return result;
  })
}

function addRowToGroup(groupId, rows) {
  tableData.update(result => {
    function findCellWidth(columnId) {
      const headersWidth = result?.headers?.find((e) => e.id === columnId)?.width;
      const fixedHeadersWidth = result?.fixedHeaders?.find(
        (e) => e.id === columnId
      )?.width;
  
      return headersWidth ? headersWidth : fixedHeadersWidth;
    }
    rows.map((r) => {
      let orderedRowCells = [];
      result?.fixedHeaders?.forEach((h) => {
        const cell = r.cells.find((c) => c.columnId === h.id);
        orderedRowCells.push(cell);
      });
  
      result.headers.forEach((h) => {
        const cell = r.cells.find((c) => c.columnId === h.id);
        orderedRowCells.push(cell);
      });
      r.cells = orderedRowCells;
      return r;
    });
  
    rows.map((r) => {
      r.fixedCells = [];
      r.cells.map((c, i) => {
        if (i < fixedColumnsCount) {
          r.fixedCells.push(c);
        }
      });
      r.cells = r.cells.slice(fixedColumnsCount);
      return r;
    });
  
    rows.map((r) => {
      r.cells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      r.fixedCells.map((c) => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
      });
  
      return r;
    });
  
    rows.map((r) => {
      r.fixedCells.map((c, i) => {
        if (i == 0) {
          c.left = 40;
          return c;
        }
        c.left = r.fixedCells.reduce((acc, curr, index) => {
          if (index < i) {
            return acc + curr.width;
          }
          return acc;
        }, 40);
        return c;
      });
      return r;
    });
    result.groups.find(g => g.groupId == groupId).rows.push(rows[0]);
    console.log(result);
    return result;
  })
}

export async function getTableData() {
  setProgressBar('start');
  const url =
    window.getTableUrl ?? '/app/v1.2/api/publications/action/get-table-data';
  const resp = await fetch(url);
  const result = await resp.json();

  return parseDataFromServer(result);
}

export async function checkTableData() {
  setProgressBar('start');
  const body = prepareBody();
  const url =
    window.checkTableUrl ??
    '/app/v1.2/api/publications/action/check-table-data';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: '{data:' + JSON.stringify(body) + '}',
  });
  const result = await response.json();
  parseDataFromServer(result);
}

export async function setTableData() {
  setProgressBar('start');
  const body = prepareBody();
  const url =
    window.setTableUrl ?? '/app/v1.2/api/publications/action/set-table-data';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: '{data:' + JSON.stringify(body) + '}',
  });
  const result = await response.json();
  alert(result?.response);
  setProgressBar('finish');
}

export async function getGroupRows(body) {
  setProgressBar('start');
  const url =
    window.setTableUrl ?? '/app/v1.2/api/publications/action/get-group-rows';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: '{data:' + JSON.stringify(body) + '}',
  });
  const result = await response.json();
  setGroupRows(body.groupId, result);
  setProgressBar('finish');
}

export async function addGroupRow(body) {
  setProgressBar('start');
  const url =
    window.setTableUrl ?? '/app/v1.2/api/publications/action/add-group-row';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: '{data:' + JSON.stringify(body) + '}',
  });
  const result = await response.json();
  addRowToGroup(body.groupId, result);
  setProgressBar('finish');
}
