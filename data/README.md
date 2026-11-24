# 数据字典

合成记录采用 UTF-8 JSON 数组。主键和字段名称见 `manifest.json`。空值为来源未提供。

日期以合同服务日的当地日历为准，季度为自然季度。权益区间左闭右开。seen 较新的同作品同主体区间覆盖先前区间，覆盖仅限声明的区间。换算的中间结果可保留精度，入单金额以分为单位四舍五入，季度比较说明口径。退款继承原交易服务日、权益和汇率；同一日多条退款按获悉顺序、随后按退款编号排序。

- `rights.json`　同作品权益区间、主体、分成及获悉日期。
- `aliases.json`　账户称呼与主体的有效期。
- `transactions.json`　发生额最小货币单位，负数为 reversal 原交易的退款。
- `rates.json`　服务日汇率以每单位外币的人民币百万分之一表示，人民币恒为 1000000。
- `settlements.json`　渠道批次净转账、费用、汇率和到账日。
- `bonus.json`　direct 按同一主体的人民币拆分金额按季度合并，阶梯为边际奖励。
- `statements.json`　旧账确认、开单额及已实际付给创作者的金额。correction-confirmed 为仅签字的调整回执，billed_cny_cents 为该次调整额。
- `metric_policy.json`　创作者留存的有效经营门槛。
