import { watchImmediate } from "@vueuse/core";
import { defineComponent, h, ref } from "vue";
import { useRoute, useRoutePath } from "vuepress/client";
import SidebarChild from "@theme-hope/components/sidebar/SidebarChild";
import SidebarGroup from "@theme-hope/components/sidebar/SidebarGroup";
import { isActiveSidebarItem } from "@theme-hope/utils/sidebar/isActiveSidebarItem";

export default defineComponent({
  name: "SidebarLinks",
  props: {
    config: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const routePath = useRoutePath();

    // Track multiple open groups instead of a single open index
    const openGroupIndices = ref([]);

    const toggleGroup = (index) => {
      const current = openGroupIndices.value.slice();
      const existingIndex = current.indexOf(index);

      if (existingIndex !== -1) {
        current.splice(existingIndex, 1);
      } else {
        current.push(index);
      }

      openGroupIndices.value = current;
    };

    watchImmediate(
      routePath,
      () => {
        const activeIndices = [];

        props.config.forEach((item, index) => {
          if (isActiveSidebarItem(route, item)) activeIndices.push(index);
        });

        openGroupIndices.value = activeIndices;
      },
      { flush: "post" },
    );

    return () =>
      h(
        "ul",
        { class: "vp-sidebar-links" },
        props.config.map((config, index) =>
          h(
            "li",
            "children" in config
              ? h(SidebarGroup, {
                  config,
                  open: openGroupIndices.value.includes(index),
                  onToggle: () => {
                    toggleGroup(index);
                  },
                })
              : h(SidebarChild, { config }),
          ),
        ),
      );
  },
});


