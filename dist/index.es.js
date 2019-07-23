import PropTypes from 'prop-types';
import React, { useMemo, useLayoutEffect } from 'react';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function getBy(obj, path, def) {
  if (!path) {
    return obj;
  }

  var pathObj = makePathArray(path);
  var val;

  try {
    val = pathObj.reduce(function (cursor, pathPart) {
      return cursor[pathPart];
    }, obj);
  } catch (e) {// continue regardless of error
  }

  return typeof val !== 'undefined' ? val : def;
}
function defaultOrderByFn(arr, funcs, dirs) {
  return _toConsumableArray(arr).sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var sortFn = funcs[i];
      var desc = dirs[i] === false || dirs[i] === 'desc';
      var sortInt = sortFn(rowA, rowB);

      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt;
      }
    }

    return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
  });
}
function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (i < 0 || arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
      return i < 0 || arguments.length <= i ? undefined : arguments[i];
    }
  }
}
function defaultGroupByFn(rows, grouper) {
  return rows.reduce(function (prev, row, i) {
    var resKey = typeof grouper === 'function' ? grouper(row.values, i) : row.values[grouper];
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
    prev[resKey].push(row);
    return prev;
  }, {});
}
function setBy() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 ? arguments[1] : undefined;
  var value = arguments.length > 2 ? arguments[2] : undefined;

  var recurse = function recurse(obj) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var key = path[depth];
    var target = _typeof(obj[key]) !== 'object' ? {} : obj[key];
    var subValue = depth === path.length - 1 ? value : recurse(target, depth + 1);
    return _objectSpread({}, obj, _defineProperty({}, key, subValue));
  };

  return recurse(obj);
}
function flexRender(Comp, props) {
  if (typeof Comp === 'function') {
    return Object.getPrototypeOf(Comp).isReactComponent ? React.createElement(Comp, props) : Comp(props);
  }

  return Comp;
}
var mergeProps = function mergeProps() {
  var props = {};

  for (var _len = arguments.length, groups = new Array(_len), _key = 0; _key < _len; _key++) {
    groups[_key] = arguments[_key];
  }

  groups.forEach(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {} : _ref$style,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ["style", "className"]);

    props = _objectSpread({}, props, rest, {
      style: _objectSpread({}, props.style || {}, style),
      className: [props.className, className].filter(Boolean).join(' ')
    });
  });
  return props;
};
var applyHooks = function applyHooks(hooks, initial) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return hooks.reduce(function (prev, next) {
    return next.apply(void 0, [prev].concat(args));
  }, initial);
};
var applyPropHooks = function applyPropHooks(hooks) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return hooks.reduce(function (prev, next) {
    return mergeProps(prev, next.apply(void 0, args));
  }, {});
};
function sum(arr) {
  return arr.reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}
function isFunction(a) {
  if (typeof a === 'function') {
    return a;
  }
}

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!Array.isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }

  return newArr;
}

var defaultState = {};

var defaultReducer = function defaultReducer(old, newState) {
  return newState;
};

var useTableState = function useTableState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var overrides = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === void 0 ? defaultReducer : _ref$reducer,
      _ref$useState = _ref.useState,
      userUseState = _ref$useState === void 0 ? React.useState : _ref$useState;

  var _userUseState = userUseState(_objectSpread({}, defaultState, initialState)),
      _userUseState2 = _slicedToArray(_userUseState, 2),
      state = _userUseState2[0],
      setState = _userUseState2[1];

  var overriddenState = React.useMemo(function () {
    var newState = _objectSpread({}, state);

    if (overrides) {
      Object.keys(overrides).forEach(function (key) {
        newState[key] = overrides[key];
      });
    }

    return newState; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrides, state]);
  var reducedSetState = React.useCallback(function (updater, type) {
    return setState(function (old) {
      var newState = updater(old);
      return reducer(old, newState, type);
    });
  }, [reducer, setState]);
  return React.useMemo(function () {
    return [overriddenState, reducedSetState];
  }, [overriddenState, reducedSetState]);
};

var renderErr = 'You must specify a render "type". This could be "Header", "Filter", or any other custom renderers you have set on your column.';
var propTypes = {
  // General
  data: PropTypes.array.isRequired,
  debug: PropTypes.bool
};
var useTable = function useTable(props) {
  // Validate props
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useTable'); // Destructure props

  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      userState = props.state,
      debug = props.debug;
  debug = process.env.NODE_ENV === 'production' ? false : debug; // Always provide a default state

  var defaultState$$1 = useTableState(); // But use the users state if provided

  var state = userState || defaultState$$1; // These are hooks that plugins can use right before render

  var hooks = {
    beforeRender: [],
    columns: [],
    headers: [],
    headerGroups: [],
    rows: [],
    row: [],
    renderableRows: [],
    getTableProps: [],
    getRowProps: [],
    getHeaderRowProps: [],
    getHeaderProps: [],
    getCellProps: [] // The initial api

  };

  var api = _objectSpread({}, props, {
    data: data,
    state: state,
    hooks: hooks
  });

  if (debug) console.time('hooks'); // Loop through plugins to build the api out

  for (var _len = arguments.length, plugins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    plugins[_key - 1] = arguments[_key];
  }

  api = plugins.filter(Boolean).reduce(function (prev, next) {
    return next(prev);
  }, api);
  if (debug) console.timeEnd('hooks'); // Run the beforeRender hook

  if (debug) console.time('hooks.beforeRender');
  applyHooks(api.hooks.beforeRender, undefined, api);
  if (debug) console.timeEnd('hooks.beforeRender');
  api.columns.forEach(function (column) {
    column.visible = typeof column.show === 'function' ? column.show(api) : !!column.show;
  });
  if (debug) console.time('hooks.columns');
  api.columns = applyHooks(api.hooks.columns, api.columns, api);
  if (debug) console.timeEnd('hooks.columns');
  if (debug) console.time('hooks.headers');
  api.headers = applyHooks(api.hooks.headers, api.headers, api);
  if (debug) console.timeEnd('hooks.headers');
  [].concat(_toConsumableArray(api.columns), _toConsumableArray(api.headers)).forEach(function (column) {
    // Give columns/headers rendering power
    column.render = function (type) {
      var userProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!type) {
        throw new Error(renderErr);
      }

      return flexRender(column[type], _objectSpread({}, api, column, userProps));
    }; // Give columns/headers getHeaderProps


    column.getHeaderProps = function (props) {
      return mergeProps({
        key: ['header', column.id].join('_'),
        colSpan: column.columns ? column.columns.length : 1
      }, applyPropHooks(api.hooks.getHeaderProps, column, api), props);
    };
  });
  if (debug) console.time('hooks.headerGroups');
  api.headerGroups = applyHooks(api.hooks.headerGroups, api.headerGroups, api).filter(function (headerGroup, i) {
    // Filter out any headers and headerGroups that don't have visible columns
    headerGroup.headers = headerGroup.headers.filter(function (header) {
      var recurse = function recurse(columns) {
        return columns.filter(function (column) {
          if (column.columns) {
            return recurse(column.columns);
          }

          return column.visible;
        }).length;
      };

      if (header.columns) {
        return recurse(header.columns);
      }

      return header.visible;
    }); // Give headerGroups getRowProps

    if (headerGroup.headers.length) {
      headerGroup.getRowProps = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return mergeProps({
          key: ["header".concat(i)].join('_')
        }, applyPropHooks(api.hooks.getHeaderRowProps, headerGroup, api), props);
      };

      return true;
    }

    return false;
  });
  if (debug) console.timeEnd('hooks.headerGroups'); // Run the rows (this could be a dangerous hook with a ton of data)

  if (debug) console.time('hooks.rows');
  api.rows = applyHooks(api.hooks.rows, api.rows, api);
  if (debug) console.timeEnd('hooks.rows'); // The prepareRow function is absolutely necessary and MUST be called on
  // any rows the user wishes to be displayed.

  api.prepareRow = function (row) {
    var path = row.path;

    row.getRowProps = function (props) {
      return mergeProps({
        key: ['row'].concat(_toConsumableArray(path)).join('_')
      }, applyPropHooks(api.hooks.getRowProps, row, api), props);
    }; // need to apply any row specific hooks (useExpanded requires this)


    applyHooks(api.hooks.row, row, api);
    var visibleColumns = api.columns.filter(function (column) {
      return column.visible;
    }); // Build the cells for each row

    row.cells = visibleColumns.map(function (column) {
      var cell = {
        column: column,
        row: row,
        value: row.values[column.id]
      };

      cell.getCellProps = function (props) {
        var columnPathStr = [path, column.id].join('_');
        return mergeProps({
          key: ['cell', columnPathStr].join('_')
        }, applyPropHooks(api.hooks.getCellProps, cell, api), props);
      };

      cell.render = function (type) {
        var userProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!type) {
          throw new Error('You must specify a render "type". This could be "Cell", "Header", "Filter", "Aggregated" or any other custom renderers you have set on your column.');
        }

        return flexRender(column[type], _objectSpread({}, api, cell, userProps));
      };

      return cell;
    });
  };

  api.getTableProps = function (userProps) {
    return mergeProps(applyPropHooks(api.hooks.getTableProps, api), userProps);
  };

  api.getRowProps = function (userProps) {
    return mergeProps(applyPropHooks(api.hooks.getRowProps, undefined, api), userProps);
  };

  return api;
};

var propTypes$1 = {
  // General
  columns: PropTypes.arrayOf(PropTypes.shape({
    Cell: PropTypes.any,
    Header: PropTypes.any
  })) // Find the depth of the columns

};

function findMaxDepth(columns) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return columns.reduce(function (prev, curr) {
    if (curr.columns) {
      return Math.max(prev, findMaxDepth(curr.columns, depth + 1));
    }

    return depth;
  }, 0);
}

function decorateColumn(column, parent) {
  // First check for string accessor
  var _column = column,
      id = _column.id,
      accessor = _column.accessor,
      Header = _column.Header;

  if (typeof accessor === 'string') {
    id = id || accessor;
    var accessorString = accessor;

    accessor = function accessor(row) {
      return getBy(row, accessorString);
    };
  }

  if (!id && typeof Header === 'string') {
    id = Header;
  }

  if (!id) {
    // Accessor, but no column id? This is bad.
    console.error(column);
    throw new Error('A column ID (or string accessor) is required!');
  }

  column = _objectSpread({
    Header: '',
    Cell: function Cell(cell) {
      return cell.value;
    },
    show: true
  }, column, {
    id: id,
    accessor: accessor,
    parent: parent
  });
  return column;
} // Build the visible columns, headers and flat column list


function decorateColumnTree(columns, parent) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return columns.map(function (column) {
    column = decorateColumn(column, parent);

    if (column.columns) {
      column.columns = decorateColumnTree(column.columns, column, depth + 1);
    }

    return column;
  });
} // Build the header groups from the bottom up


function makeHeaderGroups(columns, maxDepth) {
  var headerGroups = [];

  var removeChildColumns = function removeChildColumns(column) {
    delete column.columns;

    if (column.parent) {
      removeChildColumns(column.parent);
    }
  };

  columns.forEach(removeChildColumns);

  var buildGroup = function buildGroup(columns) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var headerGroup = {
      headers: []
    };
    var parentColumns = [];
    var hasParents = columns.some(function (col) {
      return col.parent;
    });
    columns.forEach(function (column) {
      var isFirst = !parentColumns.length;
      var latestParentColumn = [].concat(parentColumns).reverse()[0]; // If the column has a parent, add it if necessary

      if (column.parent) {
        if (isFirst || latestParentColumn.originalID !== column.parent.id) {
          parentColumns.push(_objectSpread({}, column.parent, {
            originalID: column.parent.id,
            id: [column.parent.id, parentColumns.length].join('_')
          }));
        }
      } else if (hasParents) {
        // If other columns have parents, add a place holder if necessary
        var placeholderColumn = decorateColumn({
          originalID: [column.id, 'placeholder', maxDepth - depth].join('_'),
          id: [column.id, 'placeholder', maxDepth - depth, parentColumns.length].join('_')
        });

        if (isFirst || latestParentColumn.originalID !== placeholderColumn.originalID) {
          parentColumns.push(placeholderColumn);
        }
      } // Establish the new columns[] relationship on the parent


      if (column.parent || hasParents) {
        latestParentColumn = [].concat(parentColumns).reverse()[0];
        latestParentColumn.columns = latestParentColumn.columns || [];

        if (!latestParentColumn.columns.includes(column)) {
          latestParentColumn.columns.push(column);
        }
      }

      headerGroup.headers.push(column);
    });
    headerGroups.push(headerGroup);

    if (parentColumns.length) {
      buildGroup(parentColumns);
    }
  };

  buildGroup(columns);
  return headerGroups.reverse();
}

var useColumns = function useColumns(props) {
  var debug = props.debug,
      userColumns = props.columns,
      _props$state = _slicedToArray(props.state, 1),
      groupBy = _props$state[0].groupBy;

  PropTypes.checkPropTypes(propTypes$1, props, 'property', 'useColumns');

  var _useMemo = useMemo(function () {
    if (debug) console.info('getColumns'); // Decorate All the columns

    var columnTree = decorateColumnTree(userColumns); // Get the flat list of all columns

    var columns = flattenBy(columnTree, 'columns');
    columns = [].concat(_toConsumableArray(groupBy.map(function (g) {
      return columns.find(function (col) {
        return col.id === g;
      });
    })), _toConsumableArray(columns.filter(function (col) {
      return !groupBy.includes(col.id);
    }))); // Get headerGroups

    var headerGroups = makeHeaderGroups(columns, findMaxDepth(columnTree));
    var headers = flattenBy(headerGroups, 'headers');
    return {
      columns: columns,
      headerGroups: headerGroups,
      headers: headers
    };
  }, [debug, groupBy, userColumns]),
      columns = _useMemo.columns,
      headerGroups = _useMemo.headerGroups,
      headers = _useMemo.headers;

  return _objectSpread({}, props, {
    columns: columns,
    headerGroups: headerGroups,
    headers: headers
  });

  function flattenBy(columns, childKey) {
    var flatColumns = [];

    var recurse = function recurse(columns) {
      columns.forEach(function (d) {
        if (!d[childKey]) {
          flatColumns.push(d);
        } else {
          recurse(d[childKey]);
        }
      });
    };

    recurse(columns);
    return flatColumns;
  }
};

var propTypes$2 = {
  subRowsKey: PropTypes.string
};
var useRows = function useRows(props) {
  PropTypes.checkPropTypes(propTypes$2, props, 'property', 'useRows');
  var debug = props.debug,
      columns = props.columns,
      _props$subRowsKey = props.subRowsKey,
      subRowsKey = _props$subRowsKey === void 0 ? 'subRows' : _props$subRowsKey,
      data = props.data;
  var accessedRows = useMemo(function () {
    if (debug) console.info('getAccessedRows'); // Access the row's data

    var accessRow = function accessRow(originalRow, i) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      // Keep the original reference around
      var original = originalRow; // Process any subRows

      var subRows = originalRow[subRowsKey] ? originalRow[subRowsKey].map(function (d, i) {
        return accessRow(d, i, depth + 1);
      }) : undefined;
      var row = {
        original: original,
        index: i,
        path: [i],
        // used to create a key for each row even if not nested
        subRows: subRows,
        depth: depth,
        cells: [{}] // This is a dummy cell
        // Override common array functions (and the dummy cell's getCellProps function)
        // to show an error if it is accessed without calling prepareRow

      };

      var unpreparedAccessWarning = function unpreparedAccessWarning() {
        throw new Error('React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.');
      };

      row.cells.map = unpreparedAccessWarning;
      row.cells.filter = unpreparedAccessWarning;
      row.cells.forEach = unpreparedAccessWarning;
      row.cells[0].getCellProps = unpreparedAccessWarning; // Create the cells and values

      row.values = {};
      columns.forEach(function (column) {
        row.values[column.id] = column.accessor ? column.accessor(originalRow, i, {
          subRows: subRows,
          depth: depth,
          data: data
        }) : undefined;
      });
      return row;
    }; // Use the resolved data


    return data.map(function (d, i) {
      return accessRow(d, i);
    });
  }, [debug, data, subRowsKey, columns]);
  return _objectSpread({}, props, {
    rows: accessedRows
  });
};

var actions = {};
var addActions = function addActions(acts) {
  Object.keys(acts).forEach(function (key) {
    actions[key] = acts[key];
  });
};

defaultState.expanded = {};
addActions({
  toggleExpanded: '__toggleExpanded__',
  useExpanded: '__useExpanded__'
});
var propTypes$3 = {
  manualExpandedKey: PropTypes.string,
  paginateSubRows: PropTypes.bool
};
var useExpanded = function useExpanded(props) {
  PropTypes.checkPropTypes(propTypes$3, props, 'property', 'useExpanded');

  var debug = props.debug,
      rows = props.rows,
      _props$manualExpanded = props.manualExpandedKey,
      manualExpandedKey = _props$manualExpanded === void 0 ? 'expanded' : _props$manualExpanded,
      hooks = props.hooks,
      _props$state = _slicedToArray(props.state, 2),
      expanded = _props$state[0].expanded,
      setState = _props$state[1],
      _props$paginateSubRow = props.paginateSubRows,
      paginateSubRows = _props$paginateSubRow === void 0 ? true : _props$paginateSubRow;

  var toggleExpandedByPath = function toggleExpandedByPath(path, set) {
    return setState(function (old) {
      var expanded = old.expanded;
      var existing = getBy(expanded, path);
      set = getFirstDefined(set, !existing);
      return _objectSpread({}, old, {
        expanded: setBy(expanded, path, set)
      });
    }, actions.toggleExpanded);
  };

  hooks.row.push(function (row) {
    var path = row.path;

    row.toggleExpanded = function (set) {
      return toggleExpandedByPath(path, set);
    };

    return row;
  });
  var expandedRows = useMemo(function () {
    if (debug) console.info('getExpandedRows');
    var expandedRows = []; // Here we do some mutation, but it's the last stage in the
    // immutable process so this is safe

    var handleRow = function handleRow(row) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      // Compute some final state for the row
      var path = [].concat(_toConsumableArray(parentPath), [row.index]);
      row.path = path;
      row.depth = depth;
      row.isExpanded = row.original && row.original[manualExpandedKey] || getBy(expanded, path);

      if (paginateSubRows || !paginateSubRows && row.depth === 0) {
        expandedRows.push(row);
      }

      if (row.isExpanded && row.subRows && row.subRows.length) {
        row.subRows.forEach(function (row, i) {
          return handleRow(row, depth + 1, path);
        });
      }

      return row;
    };

    rows.forEach(function (row) {
      return handleRow(row);
    });
    return expandedRows;
  }, [debug, rows, manualExpandedKey, expanded, paginateSubRows]);
  var expandedDepth = findExpandedDepth(expanded);
  return _objectSpread({}, props, {
    toggleExpandedByPath: toggleExpandedByPath,
    expandedDepth: expandedDepth,
    rows: expandedRows
  });
};

function findExpandedDepth(obj) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Object.values(obj).reduce(function (prev, curr) {
    if (_typeof(curr) === 'object') {
      return Math.max(prev, findExpandedDepth(curr, depth + 1));
    }

    return depth;
  }, 0);
}

var text = function text(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return rowValue !== undefined ? String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase()) : true;
  });
};
var exactText = function exactText(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return rowValue !== undefined ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
  });
};
var exactTextCase = function exactTextCase(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return rowValue !== undefined ? String(rowValue) === String(filterValue) : true;
  });
};
var includes = function includes(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return filterValue.includes(rowValue);
  });
};
var includesAll = function includesAll(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return filterValue.every(function (val) {
      return rowValue.includes(val);
    });
  });
};
var exact = function exact(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return rowValue === filterValue;
  });
};
var between = function between(rows, id, filterValue) {
  return rows.filter(function (row) {
    var rowValue = row.values[id];
    return rowValue >= filterValue[0] && rowValue <= filterValue[1];
  });
};

var filterTypes = /*#__PURE__*/Object.freeze({
  text: text,
  exactText: exactText,
  exactTextCase: exactTextCase,
  includes: includes,
  includesAll: includesAll,
  exact: exact,
  between: between
});

defaultState.filters = {};
addActions({
  setFilter: '__setFilter__',
  setAllFilters: '__setAllFilters__'
});
var propTypes$4 = {
  // General
  columns: PropTypes.arrayOf(PropTypes.shape({
    filterFn: PropTypes.func,
    filterAll: PropTypes.bool,
    canFilter: PropTypes.bool,
    Filter: PropTypes.any
  })),
  filterFn: PropTypes.func,
  manualFilters: PropTypes.bool
};
var useFilters = function useFilters(props) {
  PropTypes.checkPropTypes(propTypes$4, props, 'property', 'useFilters');

  var debug = props.debug,
      rows = props.rows,
      columns = props.columns,
      _props$filterTypes = props.filterTypes,
      userFilterTypes = _props$filterTypes === void 0 ? {} : _props$filterTypes,
      _props$defaultFilter = props.defaultFilter,
      defaultFilter = _props$defaultFilter === void 0 ? text : _props$defaultFilter,
      manualFilters = props.manualFilters,
      disableFilters = props.disableFilters,
      hooks = props.hooks,
      _props$state = _slicedToArray(props.state, 2),
      filters = _props$state[0].filters,
      setState = _props$state[1];

  var setFilter = function setFilter(id, val) {
    return setState(function (old) {
      if (typeof val === 'undefined') {
        var prev = filters[id],
            rest = _objectWithoutProperties(filters, [id].map(_toPropertyKey));

        return _objectSpread({}, old, {
          filters: _objectSpread({}, rest)
        });
      }

      return _objectSpread({}, old, {
        filters: _objectSpread({}, filters, _defineProperty({}, id, val))
      });
    }, actions.setFilter);
  };

  var setAllFilters = function setAllFilters(filters) {
    return setState(function (old) {
      return _objectSpread({}, old, {
        filters: filters
      });
    }, actions.setAllFilters);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      var id = column.id,
          accessor = column.accessor,
          canFilter = column.canFilter; // Determine if a column is filterable

      column.canFilter = accessor ? getFirstDefined(canFilter, disableFilters === true ? false : undefined, true) : false; // Provide the column a way of updating the filter value

      column.setFilter = function (val) {
        return setFilter(column.id, val);
      }; // Provide the current filter value to the column for
      // convenience


      column.filterValue = filters[id];
    });
    return columns;
  });
  var filteredRows = useMemo(function () {
    if (manualFilters || !Object.keys(filters).length) {
      return rows;
    }

    if (debug) console.info('getFilteredRows'); // Filters top level and nested rows

    var filterRows = function filterRows(rows) {
      var filteredRows = rows;
      filteredRows = Object.entries(filters).reduce(function (filteredSoFar, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            columnID = _ref2[0],
            filterValue = _ref2[1];

        // Find the filters column
        var column = columns.find(function (d) {
          return d.id === columnID;
        }); // Don't filter hidden columns or columns that have had their filters disabled

        if (!column || column.filterable === false) {
          return filteredSoFar;
        } // Look up filter functions in this order:
        // column function
        // column string lookup on user filters
        // column string lookup on built-in filters
        // default function
        // default string lookup on user filters
        // default string lookup on built-in filters


        var filterMethod = isFunction(column.filter) || userFilterTypes[column.filter] || filterTypes[column.filter] || isFunction(defaultFilter) || userFilterTypes[defaultFilter] || filterTypes[defaultFilter];

        if (!filterMethod) {
          console.warn("Could not find a valid 'column.filter' for column with the ID: ".concat(column.id, "."));
          return filteredSoFar;
        } // Pass the rows, id, filterValue and column to the filterMethod
        // to get the filtered rows back


        return filterMethod(filteredSoFar, columnID, filterValue, column);
      }, rows); // Apply the filter to any subRows

      filteredRows = filteredRows.map(function (row) {
        if (!row.subRows) {
          return row;
        }

        return _objectSpread({}, row, {
          subRows: filterRows(row.subRows)
        });
      }); // then filter any rows without subcolumns because it would be strange to show

      filteredRows = filteredRows.filter(function (row) {
        if (!row.subRows) {
          return true;
        }

        return row.subRows.length > 0;
      });
      return filteredRows;
    };

    return filterRows(rows);
  }, [manualFilters, filters, debug, rows, columns, userFilterTypes, defaultFilter]);
  return _objectSpread({}, props, {
    setFilter: setFilter,
    setAllFilters: setAllFilters,
    rows: filteredRows
  });
};

function sum$1(values, rows) {
  return values.reduce(function (sum, next) {
    return sum + next;
  }, 0);
}
function average(values, rows) {
  return Math.round(sum$1(values, rows) / values.length * 100) / 100;
}

var aggregations = /*#__PURE__*/Object.freeze({
  sum: sum$1,
  average: average
});

defaultState.groupBy = [];
addActions({
  toggleGroupBy: '__toggleGroupBy__'
});
var propTypes$5 = {
  // General
  columns: PropTypes.arrayOf(PropTypes.shape({
    aggregate: PropTypes.func,
    canGroupBy: PropTypes.bool,
    Aggregated: PropTypes.any
  })),
  groupByFn: PropTypes.func,
  manualGrouping: PropTypes.bool,
  aggregations: PropTypes.object
};
var useGroupBy = function useGroupBy(props) {
  PropTypes.checkPropTypes(propTypes$5, props, 'property', 'useGroupBy');

  var debug = props.debug,
      rows = props.rows,
      columns = props.columns,
      _props$groupByFn = props.groupByFn,
      groupByFn = _props$groupByFn === void 0 ? defaultGroupByFn : _props$groupByFn,
      manualGroupBy = props.manualGroupBy,
      disableGrouping = props.disableGrouping,
      _props$aggregations = props.aggregations,
      userAggregations = _props$aggregations === void 0 ? {} : _props$aggregations,
      hooks = props.hooks,
      _props$state = _slicedToArray(props.state, 2),
      groupBy = _props$state[0].groupBy,
      setState = _props$state[1];

  columns.forEach(function (column) {
    var id = column.id,
        accessor = column.accessor,
        canGroupBy = column.canGroupBy;
    column.grouped = groupBy.includes(id);
    column.canGroupBy = accessor ? getFirstDefined(canGroupBy, disableGrouping === true ? false : undefined, true) : false;
    column.Aggregated = column.Aggregated || column.Cell;
  });

  var toggleGroupBy = function toggleGroupBy(id, toggle) {
    return setState(function (old) {
      var resolvedToggle = typeof toggle !== 'undefined' ? toggle : !groupBy.includes(id);

      if (resolvedToggle) {
        return _objectSpread({}, old, {
          groupBy: [].concat(_toConsumableArray(groupBy), [id])
        });
      }

      return _objectSpread({}, old, {
        groupBy: groupBy.filter(function (d) {
          return d !== id;
        })
      });
    }, actions.toggleGroupBy);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      if (column.canGroupBy) {
        column.toggleGroupBy = function () {
          return toggleGroupBy(column.id);
        };
      }
    });
    return columns;
  });
  hooks.getGroupByToggleProps = [];

  var addGroupByToggleProps = function addGroupByToggleProps(columns, api) {
    columns.forEach(function (column) {
      var canGroupBy = column.canGroupBy;

      column.getGroupByToggleProps = function (props) {
        return mergeProps({
          onClick: canGroupBy ? function (e) {
            e.persist();
            column.toggleGroupBy();
          } : undefined,
          style: {
            cursor: canGroupBy ? 'pointer' : undefined
          },
          title: 'Toggle GroupBy'
        }, applyPropHooks(api.hooks.getGroupByToggleProps, column, api), props);
      };
    });
    return columns;
  };

  hooks.columns.push(addGroupByToggleProps);
  hooks.headers.push(addGroupByToggleProps);
  var groupedRows = useMemo(function () {
    if (manualGroupBy || !groupBy.length) {
      return rows;
    }

    if (debug) console.info('getGroupedRows'); // Find the columns that can or are aggregating
    // Uses each column to aggregate rows into a single value

    var aggregateRowsToValues = function aggregateRowsToValues(rows) {
      var values = {};
      columns.forEach(function (column) {
        var columnValues = rows.map(function (d) {
          return d.values[column.id];
        });
        var aggregate = userAggregations[column.aggregate] || aggregations[column.aggregate] || column.aggregate;

        if (typeof aggregate === 'function') {
          values[column.id] = aggregate(columnValues, rows);
        } else if (aggregate) {
          throw new Error("Invalid aggregate \"".concat(aggregate, "\" passed to column with ID: \"").concat(column.id, "\""));
        } else {
          values[column.id] = columnValues[0];
        }
      });
      return values;
    }; // Recursively group the data


    var groupRecursively = function groupRecursively(rows, groupBy) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      // This is the last level, just return the rows
      if (depth >= groupBy.length) {
        return rows;
      } // Group the rows together for this level


      var groupedRows = Object.entries(groupByFn(rows, groupBy[depth])).map(function (_ref, index) {
        var _ref2 = _slicedToArray(_ref, 2),
            groupByVal = _ref2[0],
            subRows = _ref2[1];

        // Recurse to sub rows before aggregation
        subRows = groupRecursively(subRows, groupBy, depth + 1);
        var values = aggregateRowsToValues(subRows);
        var row = {
          groupByID: groupBy[depth],
          groupByVal: groupByVal,
          values: values,
          subRows: subRows,
          depth: depth,
          index: index
        };
        return row;
      });
      return groupedRows;
    }; // Assign the new data


    return groupRecursively(rows, groupBy);
  }, [manualGroupBy, groupBy, debug, rows, columns, userAggregations, groupByFn]);
  return _objectSpread({}, props, {
    rows: groupedRows
  });
};

var reSplitAlphaNumeric = /([0-9]+)/gm; // Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity

var alphaNumeric = function alphaNumeric(a, b) {
  // Force to strings (or "" for unsupported types)
  a = toString(a);
  b = toString(b); // Split on number groups, but keep the delimiter
  // Then remove falsey split values

  a = a.split(reSplitAlphaNumeric).filter(Boolean);
  b = b.split(reSplitAlphaNumeric).filter(Boolean); // While

  while (a.length && b.length) {
    var aa = a.shift();
    var bb = b.shift();
    var an = parseInt(aa, 10);
    var bn = parseInt(bb, 10);
    var combo = [an, bn].sort(); // Both are string

    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }

      if (bb > aa) {
        return -1;
      }

      continue;
    } // One is a string, one is a number


    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    } // Both are numbers


    if (an > bn) {
      return 1;
    }

    if (bn > an) {
      return -1;
    }
  }

  return a.length - b.length;
};
function datetime(a, b) {
  a = a.getTime();
  b = b.getTime();
  return numeric(a, b);
}
function numeric(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
} // Utils

function toString(a) {
  if (typeof a === 'number') {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return '';
    }

    return String(a);
  }

  if (typeof a === 'string') {
    return a;
  }

  return '';
}

var sortTypes = /*#__PURE__*/Object.freeze({
  alphaNumeric: alphaNumeric,
  datetime: datetime,
  numeric: numeric
});

defaultState.sortBy = [];
addActions({
  sortByChange: '__sortByChange__'
});
var propTypes$6 = {
  // General
  columns: PropTypes.arrayOf(PropTypes.shape({
    sortBy: PropTypes.func,
    defaultSortDesc: PropTypes.bool
  })),
  orderByFn: PropTypes.func,
  sortTypes: PropTypes.object,
  defaultSortType: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  manualSorting: PropTypes.bool,
  disableSorting: PropTypes.bool,
  defaultSortDesc: PropTypes.bool,
  disableMultiSort: PropTypes.bool,
  disableSortRemove: PropTypes.bool
};
var useSortBy = function useSortBy(props) {
  PropTypes.checkPropTypes(propTypes$6, props, 'property', 'useSortBy');

  var debug = props.debug,
      rows = props.rows,
      columns = props.columns,
      _props$orderByFn = props.orderByFn,
      orderByFn = _props$orderByFn === void 0 ? defaultOrderByFn : _props$orderByFn,
      _props$defaultSort = props.defaultSort,
      defaultSort = _props$defaultSort === void 0 ? 'alphanumeric' : _props$defaultSort,
      _props$sortTypes = props.sortTypes,
      userSortTypes = _props$sortTypes === void 0 ? {} : _props$sortTypes,
      manualSorting = props.manualSorting,
      disableSorting = props.disableSorting,
      defaultSortDesc = props.defaultSortDesc,
      disableSortRemove = props.disableSortRemove,
      disableMultiSort = props.disableMultiSort,
      hooks = props.hooks,
      _props$state = _slicedToArray(props.state, 2),
      sortBy = _props$state[0].sortBy,
      setState = _props$state[1];

  columns.forEach(function (column) {
    var accessor = column.accessor,
        canSortBy = column.canSortBy;
    column.canSortBy = accessor ? getFirstDefined(canSortBy, disableSorting === true ? false : undefined, true) : false;
  }); // Updates sorting based on a columnID, desc flag and multi flag

  var toggleSortByID = function toggleSortByID(columnID, desc, multi) {
    return setState(function (old) {
      var sortBy = old.sortBy; // Find the column for this columnID

      var column = columns.find(function (d) {
        return d.id === columnID;
      });
      var resolvedDefaultSortDesc = getFirstDefined(column.defaultSortDesc, defaultSortDesc); // Find any existing sortBy for this column

      var existingSortBy = sortBy.find(function (d) {
        return d.id === columnID;
      });
      var hasDescDefined = typeof desc !== 'undefined' && desc !== null;
      var newSortBy = []; // What should we do with this filter?

      var action;

      if (disableMultiSort || !multi) {
        if (sortBy.length <= 1 && existingSortBy) {
          if (existingSortBy.desc && !resolvedDefaultSortDesc || !existingSortBy.desc && resolvedDefaultSortDesc) {
            action = disableSortRemove ? 'toggle' : 'remove';
          } else {
            action = 'toggle';
          }
        } else {
          action = 'replace';
        }
      } else {
        if (!existingSortBy) {
          action = 'add';
        } else {
          if (hasDescDefined) {
            action = 'set';
          } else {
            action = 'toggle';
          }
        }
      }

      if (action === 'replace') {
        newSortBy = [{
          id: columnID,
          desc: hasDescDefined ? desc : resolvedDefaultSortDesc
        }];
      } else if (action === 'add') {
        newSortBy = [].concat(_toConsumableArray(sortBy), [{
          id: columnID,
          desc: hasDescDefined ? desc : resolvedDefaultSortDesc
        }]);
      } else if (action === 'set') {
        newSortBy = sortBy.map(function (d) {
          if (d.id === columnID) {
            return _objectSpread({}, d, {
              desc: desc
            });
          }

          return d;
        });
      } else if (action === 'toggle') {
        newSortBy = sortBy.map(function (d) {
          if (d.id === columnID) {
            return _objectSpread({}, d, {
              desc: !existingSortBy.desc
            });
          }

          return d;
        });
      } else if (action === 'remove') {
        newSortBy = [];
      }

      return _objectSpread({}, old, {
        sortBy: newSortBy
      });
    }, actions.sortByChange);
  };

  hooks.columns.push(function (columns) {
    columns.forEach(function (column) {
      if (column.canSortBy) {
        column.toggleSortBy = function (desc, multi) {
          return toggleSortByID(column.id, desc, multi);
        };
      }
    });
    return columns;
  });
  hooks.getSortByToggleProps = [];

  var addSortByToggleProps = function addSortByToggleProps(columns, api) {
    columns.forEach(function (column) {
      var canSortBy = column.canSortBy;

      column.getSortByToggleProps = function (props) {
        return mergeProps({
          onClick: canSortBy ? function (e) {
            e.persist();
            column.toggleSortBy(undefined, !api.disableMultiSort && e.shiftKey);
          } : undefined,
          style: {
            cursor: canSortBy ? 'pointer' : undefined
          },
          title: 'Toggle SortBy'
        }, applyPropHooks(api.hooks.getSortByToggleProps, column, api), props);
      };
    });
    return columns;
  };

  hooks.columns.push(addSortByToggleProps);
  hooks.headers.push(addSortByToggleProps); // Mutate columns to reflect sorting state

  columns.forEach(function (column) {
    var id = column.id;
    column.sorted = sortBy.find(function (d) {
      return d.id === id;
    });
    column.sortedIndex = sortBy.findIndex(function (d) {
      return d.id === id;
    });
    column.sortedDesc = column.sorted ? column.sorted.desc : undefined;
  });
  var sortedRows = useMemo(function () {
    if (manualSorting || !sortBy.length) {
      return rows;
    }

    if (debug) console.info('getSortedRows');
    var sortTypesByColumnID = {};
    columns.forEach(function (col) {
      sortTypesByColumnID[col.id] = col.sortBy;
    });

    var sortData = function sortData(rows) {
      // Use the orderByFn to compose multiple sortBy's together.
      // This will also perform a stable sorting using the row index
      // if needed.
      var sortedData = orderByFn(rows, sortBy.map(function (sort) {
        // Support custom sorting methods for each column
        var columnSort = sortTypesByColumnID[sort.id]; // Look up sortBy functions in this order:
        // column function
        // column string lookup on user sortType
        // column string lookup on built-in sortType
        // default function
        // default string lookup on user sortType
        // default string lookup on built-in sortType

        var sortMethod = isFunction(columnSort) || userSortTypes[columnSort] || sortTypes[columnSort] || isFunction(defaultSort) || userSortTypes[defaultSort] || sortTypes[defaultSort]; // Return the correct sortFn

        return function (a, b) {
          return sortMethod(a.values[sort.id], b.values[sort.id], sort.desc);
        };
      }), // Map the directions
      sortBy.map(function (d) {
        return !d.desc;
      })); // If there are sub-rows, sort them

      sortedData.forEach(function (row) {
        if (!row.subRows) {
          return;
        }

        row.subRows = sortData(row.subRows);
      });
      return sortedData;
    };

    return sortData(rows);
  }, [manualSorting, sortBy, debug, columns, rows, orderByFn, userSortTypes, defaultSort]);
  return _objectSpread({}, props, {
    rows: sortedRows
  });
};

defaultState.pageSize = 10;
defaultState.pageIndex = 0;
addActions({
  pageChange: '__pageChange__',
  pageSizeChange: '__pageSizeChange__'
});
var propTypes$7 = {
  // General
  manualPagination: PropTypes.bool
};
var usePagination = function usePagination(props) {
  PropTypes.checkPropTypes(propTypes$7, props, 'property', 'usePagination');

  var rows = props.rows,
      manualPagination = props.manualPagination,
      disablePageResetOnDataChange = props.disablePageResetOnDataChange,
      debug = props.debug,
      _props$state = _slicedToArray(props.state, 2),
      _props$state$ = _props$state[0],
      pageSize = _props$state$.pageSize,
      pageIndex = _props$state$.pageIndex,
      userPageCount = _props$state$.pageCount,
      filters = _props$state$.filters,
      groupBy = _props$state$.groupBy,
      sortBy = _props$state$.sortBy,
      setState = _props$state[1];

  var pageOptions = useMemo(function () {
    return _toConsumableArray(new Array(userPageCount)).map(function (d, i) {
      return i;
    });
  }, [userPageCount]);
  var rowDep = disablePageResetOnDataChange ? null : rows;
  useLayoutEffect(function () {
    setState(function (old) {
      return _objectSpread({}, old, {
        pageIndex: 0
      });
    }, actions.pageChange);
  }, [setState, rowDep, filters, groupBy, sortBy]);

  var _useMemo = useMemo(function () {
    if (manualPagination) {
      return {
        pages: [rows],
        pageCount: userPageCount
      };
    }

    if (debug) console.info('getPages'); // Create a new pages with the first page ready to go.

    var pages = rows.length ? [] : [[]]; // Start the pageIndex and currentPage cursors

    var cursor = 0;

    while (cursor < rows.length) {
      var end = cursor + pageSize;
      pages.push(rows.slice(cursor, end));
      cursor = end;
    }

    var pageCount = pages.length;
    return {
      pages: pages,
      pageCount: pageCount,
      pageOptions: pageOptions
    };
  }, [manualPagination, debug, rows, pageOptions, userPageCount, pageSize]),
      pages = _useMemo.pages,
      pageCount = _useMemo.pageCount;

  var page = manualPagination ? rows : pages[pageIndex] || [];
  var canPreviousPage = pageIndex > 0;
  var canNextPage = pageIndex < pageCount - 1;

  var gotoPage = function gotoPage(pageIndex) {
    if (debug) console.info('gotoPage');
    return setState(function (old) {
      if (pageIndex < 0 || pageIndex > pageCount - 1) {
        return old;
      }

      return _objectSpread({}, old, {
        pageIndex: pageIndex
      });
    }, actions.pageChange);
  };

  var previousPage = function previousPage() {
    return gotoPage(pageIndex - 1);
  };

  var nextPage = function nextPage() {
    return gotoPage(pageIndex + 1);
  };

  var setPageSize = function setPageSize(pageSize) {
    setState(function (old) {
      var topRowIndex = old.pageSize * old.pageIndex;
      var pageIndex = Math.floor(topRowIndex / pageSize);
      return _objectSpread({}, old, {
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    }, actions.pageSizeChange);
  };

  return _objectSpread({}, props, {
    pages: pages,
    pageOptions: pageOptions,
    pageCount: pageCount,
    page: page,
    canPreviousPage: canPreviousPage,
    canNextPage: canNextPage,
    gotoPage: gotoPage,
    previousPage: previousPage,
    nextPage: nextPage,
    setPageSize: setPageSize,
    pageIndex: pageIndex,
    pageSize: pageSize
  });
};

var propTypes$8 = {
  defaultFlex: PropTypes.number
};
var useFlexLayout = function useFlexLayout(props) {
  PropTypes.checkPropTypes(propTypes$8, props, 'property', 'useFlexLayout');
  var _props$defaultFlex = props.defaultFlex,
      defaultFlex = _props$defaultFlex === void 0 ? 1 : _props$defaultFlex,
      _props$hooks = props.hooks,
      columnsHooks = _props$hooks.columns,
      getRowProps = _props$hooks.getRowProps,
      getHeaderRowProps = _props$hooks.getHeaderRowProps,
      getHeaderProps = _props$hooks.getHeaderProps,
      getCellProps = _props$hooks.getCellProps;
  columnsHooks.push(function (columns, api) {
    var visibleColumns = columns.filter(function (column) {
      return column.visible;
    });
    var columnMeasurements = {};
    var sumWidth = 0;
    visibleColumns.forEach(function (column) {
      var _getSizesForColumn = getSizesForColumn(column, defaultFlex, undefined, undefined, api),
          width = _getSizesForColumn.width,
          minWidth = _getSizesForColumn.minWidth;

      if (width) {
        sumWidth += width;
      } else if (minWidth) {
        sumWidth += minWidth;
      } else {
        sumWidth += defaultFlex;
      }
    });
    var rowStyles = {
      style: {
        display: 'flex',
        minWidth: "".concat(sumWidth, "px")
      }
    };
    api.rowStyles = rowStyles;
    getRowProps.push(function () {
      return rowStyles;
    });
    getHeaderRowProps.push(function () {
      return rowStyles;
    });
    getHeaderProps.push(function (column) {
      return {
        style: _objectSpread({
          boxSizing: 'border-box'
        }, getStylesForColumn(column, columnMeasurements, defaultFlex, api))
      };
    });
    getCellProps.push(function (cell) {
      return {
        style: _objectSpread({}, getStylesForColumn(cell.column, columnMeasurements, defaultFlex, undefined, api))
      };
    });
    return columns;
  });
  return props;
}; // Utils

function getStylesForColumn(column, columnMeasurements, defaultFlex, api) {
  var _getSizesForColumn2 = getSizesForColumn(column, columnMeasurements, defaultFlex, api),
      flex = _getSizesForColumn2.flex,
      width = _getSizesForColumn2.width,
      maxWidth = _getSizesForColumn2.maxWidth;

  return {
    flex: "".concat(flex, " 0 auto"),
    width: "".concat(width, "px"),
    maxWidth: "".concat(maxWidth, "px")
  };
}

function getSizesForColumn(_ref, columnMeasurements, defaultFlex, api) {
  var columns = _ref.columns,
      id = _ref.id,
      width = _ref.width,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth;

  if (columns) {
    columns = columns.filter(function (col) {
      return col.show || col.visible;
    }).map(function (column) {
      return getSizesForColumn(column, columnMeasurements, defaultFlex, api);
    }).filter(Boolean);

    if (!columns.length) {
      return false;
    }

    var flex = sum(columns.map(function (col) {
      return col.flex;
    }));

    var _width = sum(columns.map(function (col) {
      return col.width;
    }));

    var _maxWidth = sum(columns.map(function (col) {
      return col.maxWidth;
    }));

    return {
      flex: flex,
      width: _width,
      maxWidth: _maxWidth
    };
  }

  return {
    flex: width ? 0 : defaultFlex,
    width: width === 'auto' ? columnMeasurements[id] || defaultFlex : getFirstDefined(width, minWidth, defaultFlex),
    maxWidth: maxWidth
  };
}

// index based pagination. This hook aids in that process.

var useTokenPagination = function useTokenPagination() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      pageToken = _React$useState2[0],
      setPageToken = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      nextPageToken = _React$useState4[0],
      setNextPageToken = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      previousPageTokens = _React$useState6[0],
      setPreviousPageTokens = _React$useState6[1];

  var _React$useState7 = React.useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      pageIndex = _React$useState8[0],
      setPageIndex = _React$useState8[1]; // Since we're using pagination tokens intead of index, we need
  // to be a bit clever with page-like navigation here.


  var nextPage = function nextPage() {
    setPageIndex(function (old) {
      return old + 1;
    });
    setPreviousPageTokens(function (old) {
      return [].concat(_toConsumableArray(old), [pageToken]);
    });
    setPageToken(nextPageToken);
  };

  var previousPage = function previousPage() {
    setPageIndex(function (old) {
      return old - 1;
    });
    setPreviousPageTokens(function (old) {
      return _toConsumableArray(old).reverse().slice(1).reverse();
    });
    setPageToken(previousPageTokens[previousPageTokens.length - 1]);
  };

  var resetPagination = function resetPagination() {
    setPageToken(undefined);
    setPageIndex(0);
    setNextPageToken(undefined);
    setPreviousPageTokens([]);
  };

  var canPreviousPage = previousPageTokens.length;
  var canNextPage = nextPageToken;
  return {
    setNextPageToken: setNextPageToken,
    pageToken: pageToken,
    pageIndex: pageIndex,
    previousPage: previousPage,
    nextPage: nextPage,
    canPreviousPage: canPreviousPage,
    canNextPage: canNextPage,
    resetPagination: resetPagination
  };
};

export { useTable, useColumns, useRows, useExpanded, useFilters, useGroupBy, useSortBy, usePagination, useTableState, useFlexLayout, useTokenPagination, actions };
//# sourceMappingURL=index.es.js.map
