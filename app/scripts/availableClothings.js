class AvailableClothings {
  getAll() {
    return [
      {
        "name": "Mine",
        "rules": [
          {
            "when": { "blue": "*", "black": "+", "red": 4, "green": "*" },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217961/ef2e0d4c-8dea-11e6-960d-69585778f89d.png"
          },

          {
            "when": { "blue": 0, "black": 0, "red": 0, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217956/ef1d928c-8dea-11e6-8b53-8d2495cdd3e9.png"
          },

          {
            "when": { "blue": 0, "black": 0, "red": 0, "green": 1 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217959/ef27e822-8dea-11e6-9bb0-57892593c9d8.png"
          },

          {
            "when": { "blue": 1, "black": 0, "red": 0, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217958/ef245892-8dea-11e6-80f4-aeb5d1862b1c.png"
          },

          {
            "when": { "blue": 0, "black": 1, "red": 0, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217957/ef20120a-8dea-11e6-825c-23e7773269b0.png"
          },

          {
            "when": { "blue": 0, "black": 0, "red": 1, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19217960/ef2ad3c0-8dea-11e6-8434-ff9152b76f3b.png"
          }
        ]
      }

    ,

      {
        "name": "Fruits",
        "rules": [
          {
            "when": { "blue": 0, "black": 0, "red": 0, "green": 1 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19218600/74382b40-8dfe-11e6-8c4b-26e080db42be.png"
          },

          {
            "when": { "blue": 1, "black": 0, "red": 0, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19218598/74186116-8dfe-11e6-90a6-bcdbeed8725d.png"
          },

          {
            "when": { "blue": 0, "black": 1, "red": 0, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19375196/ffc4c0b6-91d1-11e6-985e-b072bd07b3e2.png"
          },

          {
            "when": { "blue": 0, "black": 0, "red": 1, "green": 0 },
            "image": "https://cloud.githubusercontent.com/assets/1631752/19218597/7417576c-8dfe-11e6-9fe4-25d8820b8095.png"
          }
        ]
      }

    ];
  }
}
