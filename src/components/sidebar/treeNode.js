import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url];

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  // crappy hardcoded fix to change sidebar item order and titles
  if (hasChildren) {
    switch (items[0].label) {
      case 'blank-scroll-guide': // guides
        items[0] = { items:[], label: 'blank-scroll-guide', title: 'Blank Scroll', url: '/guides/blank-scroll-guide'};
        break;
      case 'armbands': // items
        items[0] = { items:[], label: 'price-chart', title: 'Price Chart', url: '/items/price-chart'};
        items[1] = { items:[], label: 'weapons', title: 'Weapons', url: '/items/weapons'};
        items[2] = { items:[], label: 'shields', title: 'Shields', url: '/items/shields'};
        items[3] = { items:[], label: 'armbands', title: 'Armbands', url: '/items/armbands'};
        items[4] = { items:[], label: 'herbs', title: 'Herbs', url: '/items/herbs'};
        items[5] = { items:[], label: 'staves', title: 'Staves', url: '/items/staves'};
        items[6] = { items:[], label: 'scrolls', title: 'Scrolls', url: '/items/scrolls'};
        items[7] = { items:[], label: 'jars', title: 'Jars', url: '/items/jars'};
        items[8] = { items:[], label: 'food', title: 'Food', url: '/items/food'};
        items[9] = { items:[], label: 'monster-meat', title: 'Meat', url: '/items/monster-meat'};
        items[10] = { items:[], label: 'projectiles', title: 'Projectiles', url: '/items/projectiles'};
        break;
      case 'allies': // system
        items[0] = { items:[], label: 'meld-abilities', title: 'Meld Abilities', url: '/system/meld-abilities'};
        items[1] = { items:[], label: 'monsters', title: 'Monsters', url: '/system/monsters'};
        items[2] = { items:[], label: 'traps', title: 'Traps', url: '/system/traps'};
        items[3] = { items:[], label: 'allies', title: 'Allies', url: '/system/allies'};
        items[4] = { items:[], label: 'villages', title: 'Villages', url: '/system/villages'};
        items[5] = { items:[], label: 'status-conditions', title: 'Status', url: '/system/status-conditions'};
        break;
      case 'road-to-the-hamlet': // dungeons
        items[0] = { items:[], label: 'road-to-the-hamlet', title: 'Road to Hamlet', url: '/dungeons/road-to-the-hamlet'};
        items[1] = { items:[], label: 'table-mountain', title: 'Table Mountain', url: '/dungeons/table-mountain'};
        items[2] = { items:[], label: 'tainted-path', title: 'Tainted Path', url: '/dungeons/tainted-path'};
        break;
      default:
        // do nothing
    }
  }

  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url}>
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
