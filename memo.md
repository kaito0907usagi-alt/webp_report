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

        %% 派生作品一覧の操作（起点に戻る）
        subgraph "派生作品一覧の操作"
            addB["追加"]
            editB["編集"]
            delB["削除"]
        end
        B --> addB
        B --> editB
        B --> delB
        addB --> B
        editB --> B
        delB --> B

        %% 詳細表示の操作（起点に戻る）
        subgraph "詳細表示の操作"
            editC["編集"]
            delC["削除"]
        end
        C --> editC
        C --> delC
        editC -->C
        delC --> C
```
