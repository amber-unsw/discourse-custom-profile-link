import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class CustomProfileLink extends Component {
    get links() {
        if (settings.custom_profile_link_debug_mode) console.debug("[Custom Profile Link] Settings dump follows", settings);
        const ids = settings.custom_profile_link_user_field_ids.replace(/_/g, "").split(/\|/).map(Number);
        const labels = settings.custom_profile_link_labels.split(/\|/);
        const prefixes = settings.custom_profile_link_prefixes.split(/\|/);
        const orgs = settings.custom_profile_link_orgs.split(/\|/);
        const parsedSettings = { "ids": ids, "labels": labels, "prefixes": prefixes /*, "orgs": {"labels": orgLabels, "name-ids": orgNames, "url-ids": orgUrls} */ }
        if (settings.custom_profile_link_debug_mode) console.debug("[Custom Profile Link] Parsed settings dump follows", parsedSettings);
        let links = [];
        if (settings.custom_profile_link_debug_mode) console.debug("[Custom Profile Link] args dump:", this.args.outletArgs);
        if (!this.args.outletArgs.user.get('user_fields')) {
            console.warn(`[Custom Profile Link] User Card () missing "user_fields"! Raw user dump follows.`, this.args.outletArgs.user);
            return undefined;
        } else {
            for (let i = 0; i < ids.length; i++) {
                if (!this.args.outletArgs.user.get('user_fields')[ids[i]] && settings.custom_profile_link_debug_mode) console.debug(`[Custom Profile Link] User field ${ids[i]} missing. user_fields dump follows.`, this.args.outletArgs.user.get("user_fields"));
                if (!!this.args.outletArgs.user.get('user_fields')[ids[i]]) links.push([this.args.outletArgs.user.get('user_fields')[ids[i]], labels[i], prefixes[i]]);
            }
            if (settings.custom_profile_link_debug_mode) console.debug("[Custom Profile Link] links built, dump:", links);
            return links;
        }
    }
}