const theme = {
  theme_color: {
    background: "#6A6A6A",
    foreground: "#6A6A6A",
    card: "#6A6A6A",
    "card-foreground": "#6A6A6A",
    popover: "#6A6A6A",
    "popover-foreground": "#6A6A6A",
    primary: "",
    "primary-foreground": "",
    secondary: "",
    "secondary-foreground": "",
    muted: "#F4F7FF",
    "muted-foreground": "#070F2B",
    success: "#00DFA2",
    "success-foreground": "#00A97B",
    "success-border": "#00DFA2",
    destructive: "#FF304F",
    "destructive-foreground": "#FFFFFF",
    border: "",
    input: "",
    ring: "",
    radius: "",
  },
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("theme").insert({
    key: "DEFAULT",
    value: theme,
  });
}
