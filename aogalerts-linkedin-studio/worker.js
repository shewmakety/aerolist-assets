/* SETTINGS
   Worker name and the static-asset binding.
   Brand tokens, sizes, and sample copy live in studio.js.
*/
const SETTINGS = {
  name: "aogalerts-linkedin-studio",
  assetsBinding: "ASSETS",
};

export default {
  async fetch(request, env) {
    return env[SETTINGS.assetsBinding].fetch(request);
  },
};
