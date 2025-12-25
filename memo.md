# FF のシステム

##　データ構造
id とシリーズ名とその中でのナンバリングで決定する
例として FF13-2 であれば，id=1，シリーズ名="FF13"，ナンバリング="2"となる．

| タイトル名            | id  | シリーズ名 | ナンバリング |
| --------------------- | --- | ---------- | ------------ |
| Final Fantasy         | 1   | FF1        | 1            |
| Final Fantasy II      | 2   | FF2        | 1            |
| Final Fantasy III     | 3   | FF3        | 1            |
| Final Fantasy XIII    | 4   | FF13       | 1            |
| Final Fantasy XIII-2  | 5   | FF13       | 2            |
| Final Fantasy Tactics | 6   | その他     | 1            |

## ページ遷移図

```mermaid
graph LR
        %% 変更: 各操作を「起点ごと」に分け、操作後は起点に戻る一方向フローにします。
        A["シリーズ一覧表示"]
        B["派生作品一覧"]
        C["詳細表示"]

        A --> B
        B --> C

        %% シリーズ一覧の操作（起点に戻る）
        subgraph "シリーズ一覧の操作"
            addA["追加 (一覧)"]
            editA["編集 (一覧)"]
            delA["削除 (一覧)"]
            confirmA["確認 (一覧)"]
        end
        A --> addA
        A --> editA
        A --> delA
        addA -->|成功 / キャンセル| A
        editA -->|保存 / キャンセル| A
        delA --> confirmA
        confirmA -->|確認OK| A

        %% 派生作品一覧の操作（起点に戻る）
        subgraph "派生作品一覧の操作"
            addB["追加 (派生)"]
            editB["編集 (派生)"]
            delB["削除 (派生)"]
            confirmB["確認 (派生)"]
        end
        B --> addB
        B --> editB
        B --> delB
        addB -->|成功 / キャンセル| B
        editB -->|保存 / キャンセル| B
        delB --> confirmB
        confirmB -->|確認OK| B

        %% 詳細表示の操作（起点に戻る）
        subgraph "詳細表示の操作"
            editC["編集 (詳細)"]
            delC["削除 (詳細)"]
            confirmC["確認 (詳細)"]
        end
        C --> editC
        C --> delC
        editC -->|保存 / キャンセル| C
        delC --> confirmC
        confirmC -->|確認OK| C
```
