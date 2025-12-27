# FF のシステム

##　データ構造

| name                                       | id  | series             |  year   | main  | device                   | explanation               |
| :----------------------------------------- | :-: | :----------------- | :-----: | :---: | :----------------------- | :------------------------ |
| Final Fantasy                              |  1  | FinalFantasyI      | 1987-12 | true  | ファミリーコンピューター | FF シリーズ初タイトル     |
| Final Fantasy II                           |  2  | FinalFantasyII     | 1988-12 | true  | ファミリーコンピューター | 熟練度システム            |
| Final Fantasy III                          |  3  | FinalFantasyIII    | 1990-04 | true  | ファミリーコンピューター | 初のジョブシステム        |
| Final Fantasy XIII                         |  4  | FinalFantasyXIII   | 2009-12 | true  | PS3                      | オプティマシステム        |
| Final Fantasy XII-2                        |  5  | FinalFantasyXIII   | 2011-12 | false | PS3                      | FF13 の続編               |
| FINALFANTASYTACTICS THE IVALICE CHRONICLES |  6  | FinalFantasyothers | 2025-09 | false | PS5                      | タクティカル RPG の金字塔 |

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

| id  | name           | species | week | resist     | invalid |
| --- | -------------- | ------- | ---- | ---------- | ------- |
| 1   | ディノバルド   | 獣竜種  | 水   | 雷         | 火      |
| 2   | ジンオウガ     | 牙竜種  | 氷   | 火　龍     | 雷      |
| 3   | イャンガルルガ | 鳥竜種  | 水   | 氷         | 火　雷  |
| 4   | ミラボレアス   | 古龍種  | 龍   | 水　雷　氷 | -       |

##　データ遷移図

```mermaid
graph LR
    %% ページ構成 (mh.js のルーティングに基づく)
    A["種族一覧表示<br/>(/mh)"]
    B["シリーズ一覧<br/>(/mh/:species)"]
    C["詳細表示<br/>(/mh/:species/:name)"]

    %% メインフロー
    A --> B
    B --> C

    %% シリーズ一覧における操作
    subgraph "シリーズ一覧の操作 (/mh/:species)"
        direction TB
        addB["新規追加<br/>(/mh_add)"]
        editB["編集・更新<br/>(/mh/update/:id)"]
        delB["削除<br/>(/mh/delete/...)"]

        addB -- "select=0" --> B
        editB -- "select=0" --> B
        delB -- "select=1" --> B
    end

    addB -- "select=1" --> A
    addB -- "else" --> addB
    editB -- "select=1" --> A
    delB -- "else" --> A

    B --- addB
    B --- editB
    B --- delB

    %% 詳細表示における操作
    subgraph "詳細表示の操作 (/mh/:species/:name)"
        direction TB
        editC["編集・更新<br/>(/mh/update/:id)"]
        delC["削除<br/>(/mh/delete/...)"]

        editC -- "else (default)" --> C
        editC -- "select=0" --> B
        delC -- "select=1" --> B
    end

    editC -- "select=1" --> A
    delC -- "else" --> A

    C --- editC
    C --- delC
```

# ペルソナのシステム

## データ構造

| id  | name             | arcana | week   | resist | invalid | reflection | absorption | example                                              |
| --- | ---------------- | ------ | ------ | ------ | ------- | ---------- | ---------- | ---------------------------------------------------- |
| 1   | ジャアクフロスト | 愚者   | 光     | -      | 火      | 闇         | 氷         | キングフロスト × ジャックランタン × ジャックフロスト |
| 2   | スルト           | 魔術師 | 氷     | -      | -       | -          | 火         | ジャターユ × ソロネ                                  |
| 3   | スカアハ         | 女教皇 | 火     | 風　光 | 氷      | -          | -          | ガルーダ × ガブリエル                                |
| 4   | アリラト         | 女帝   | 火　闇 | 風     | 氷      | 斬　打     | -          | サンダルフォン × スサノオ                            |
| 5   | オーディン       | 皇帝   | 風     | -      | -       | -          | 雷         | セイテンタイセイ × クヴァンダ                        |
| 6   | コウリュウ       | 法王   | -      | -      | 打      | -          | 雷         | ゲンブ × セイリュウ × ビャッコ × スザク              |

##　データ遷移図

```mermaid
graph LR
    %% ページ構成
    A["アルカナ一覧表示<br/>(/persona)"]
    B["ペルソナ一覧表示<br/>(/persona/:arcana)"]
    C["詳細表示<br/>(/persona/:arcana/:name)"]

    %% メインフロー
    A --> B
    B --> C

    %% アルカナ一覧/ペルソナ一覧からの操作
    subgraph "一覧画面からの操作"
        direction TB
        add["新規追加<br/>(/persona_add)"]
        editB["編集・更新<br/>(/persona/update/:id)"]
        delB["削除<br/>(/persona/delete/...)"]

        add -- "select=0" --> B
        editB -- "select=0" --> B
        delB -- "select=1" --> B
    end

    add -- "select=1" --> A
    add -- "select=2" --> add
    editB -- "select=1" --> A
    delB -- "select=0" --> A

    B --- add
    B --- editB
    B --- delB

    %% 詳細表示からの操作
    subgraph "詳細表示の操作"
        direction TB
        editC["編集・更新<br/>(/persona/update/:id)"]
        delC["削除<br/>(/persona/delete/...)"]

        editC -- "select=2" --> C
        editC -- "select=0" --> B
        delC -- "select=1" --> B
    end

    editC -- "select=1" --> A
    delC -- "select=0" --> A

    C --- editC
    C --- delC

```
