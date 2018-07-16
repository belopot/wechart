
import cax from 'cax'

import Excel from '../../src/index'

const stage = new cax.Stage(740, 520, 'body')

//todo rows 里面的 text 去掉
//todo 搞个漂亮的样式实现一下

//不支持击穿边框！！
const excel = new Excel([
  [null, 'A', 'B','C'],
  [1, null, null, null],
  [2, '123AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA123AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA123AAAAAAA', '123AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', ''],
  [3, null, null, null],
  [4, 'sdfsf', null, null],
  [5, null, null, null],
  [6, null, null, null],
  [7, 'center middle', 'bottom right', null]
], {
    colWidth: [40, 200, 200,130],
    rowHeight: [20, 30, 100, 30, 50, 60, 60, 60],
    merge: [
      [0, 3, 2, 1],
      [1, 1, 1, 2]
    ],
    style: null,
    //todo 自动标注顶部和左边,这里要自动多加一行和一列
    autoLabelX: false,
    autoLabelY: false,
    //todo
    hideGrid: false
  })

// excel.x = 30
// excel.y = 30
//excel.hideRows([1,2])
//excel.hideCols([1])

stage.add(excel)

cax.tick(stage.update.bind(stage))
