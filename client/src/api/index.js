import axios from "axios";

const TOKEN = "4AUFMvQbjLwRnnuM5NLQqVwj8WPu-wQgNssRZjpV9WDDjnvNI68";

export default axios.create({
  baseURL: "https://api.pandascore.co/matches",
  params: {
    token: TOKEN,
  },
});
