# FF のシステム

##　データ構造
id とシリーズ名とその中でのナンバリングで決定する
例として FF13-2 であれば，id=5，シリーズ名="FinalFantasyXIII"，ナンバリング="2"となる．

| タイトル名                                 | id  | シリーズ名         | 発売年月 | 一作目 | 対応ハード               | 説明                      |
| :----------------------------------------- | :-: | :----------------- | :------: | :----: | :----------------------- | :------------------------ |
| Final Fantasy                              |  1  | FinalFantasyI      | 1987-12  |  true  | ファミリーコンピューター | FF シリーズ初タイトル     |
| Final Fantasy II                           |  2  | FinalFantasyII     | 1988-12  |  true  | ファミリーコンピューター | 熟練度システム            |
| Final Fantasy III                          |  3  | FinalFantasyIII    | 1990-04  |  true  | ファミリーコンピューター | 初のジョブシステム        |
| Final Fantasy XIII                         |  4  | FinalFantasyXIII   | 2009-12  |  true  | PS3                      | オプティマシステム        |
| Final Fantasy XII-2                        |  5  | FinalFantasyXIII   | 2011-12  | false  | PS3                      | FF13 の続編               |
| FINALFANTASYTACTICS THE IVALICE CHRONICLES |  6  | FinalFantasyothers | 2025-09  | false  | PS5                      | タクティカル RPG の金字塔 |

## ページ遷移図

```mermaid
graph LR
    %% ページ構成 (ff.js のルーティングに基づく)
    A["シリーズ一覧表示<br/>(/ff)"]
    B["派生作品一覧<br/>(/ff/:series)"]
    C["詳細表示<br/>(/ff/:series/:year)"]

    %% メインフロー
    A --> B
    B --> C

    %% 派生作品一覧の操作（起点に戻る/リダイレクト）
    subgraph "派生作品一覧の操作 (/ff/:series)"
        direction TB
        addB["新規追加<br/>(/ff_add)"]
        editB["編集<br/>(/ff/edit/:year)"]
        delB["削除<br/>(/ff/delete/...)"]

        addB -- "select=0" --> B

        editB -- "select=0" --> B

        delB -- "select=1" --> B

    end
    addB -- "select=1" --> A
    editB -- "select=1" --> A
    delB -- "select!=1" --> A
    B --- addB
    B --- editB
    B --- delB

    %% 詳細表示の操作（起点に戻る/リダイレクト）
    subgraph "詳細表示の操作 (/ff/:series/:year)"
        direction TB
        editC["編集・更新<br/>(/ff/update/:id)"]
        delC["削除<br/>(/ff/delete/...)"]

        editC -- "else (default)" --> C
        editC -- "select=0" --> B

        delC -- "select=1" --> B

    end
    editC -- "select=1" --> A
    delC -- "else" --> A
    C --- editC
    C --- delC
```

# モンハンアイスボーンのシステム

## データ構造

| id  | モンスター名   | 種族   | 弱点 | 耐性       | 無効   |
| --- | -------------- | ------ | ---- | ---------- | ------ |
| 1   | ディノバルド   | 獣竜種 | 水   | 雷         | 火     |
| 2   | ジンオウガ     | 牙竜種 | 氷   | 火　龍     | 雷     |
| 3   | イャンガルルガ | 鳥竜種 | 水   | 氷         | 火　雷 |
| 4   | ミラボレアス   | 古龍種 | 龍   | 水　雷　氷 | -      |

##　データ遷移図
