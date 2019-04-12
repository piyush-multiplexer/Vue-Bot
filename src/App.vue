<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
        /*width*/
    *{ -webkit-overflow-scrolling: touch; }

    ::-webkit-scrollbar {
        width: 0px;
        height: 6px;
    }
     /*Track */
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }
    ::-webkit-scrollbar-track {
        background: transparent
    }
     /*Handle */
    ::-webkit-scrollbar-thumb {
        background: transparent;
    }
</style>
