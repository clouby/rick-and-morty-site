<template>
    <div class="container">
       <slot/>
    </div>
</template>

<script>
export default {
    setup() {
        console.log('container')
    }
}
</script>
