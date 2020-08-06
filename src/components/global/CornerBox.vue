<template>
    <div class="corner-box" :style="style">
        <i class="corner corner-1"></i>
        <i class="corner corner-2"></i>
        <i class="corner corner-3"></i>
        <i class="corner corner-4"></i>
        <slot></slot>
    </div>
</template>

<script>
    export default {

        props: {
            height: {},
            width: {},
            background: {},
        },

        computed: {
            style() {
                const { width, height, background } = this;
                return {
                    background,
                    height,
                    width
                }
            }
        }
    }
</script>
