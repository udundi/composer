<template>
  <div class="fixed inset-0 w-full h-full pointer-events-none z-0">
    <div class="animation-wrapper">
        <div class="rotating-group">
          <div class="inner1"></div>
          <div class="inner2"></div>
        </div>
        <div class="rotating-group2">
          <div class="inner1"></div>
          <div class="inner2"></div>
        </div>
      </div>
      <div class="frame"></div>
      <div class="bg-wrapper">
        <div class="inner">
          <div class="bg"></div>
        </div>
      </div>
    </div>
</template>

<script setup>
// No JS needed for this animation component
</script>

<style lang="scss">
html,
body {
  overflow: hidden;
}

#hubspot-messages-iframe-container,
#chat-widget-iframe {
  display: none !important;
}

.chat-logo {
  font-size: 3.5rem;
  font-weight: 500;
}

.beta-icon {
  border-width: 1px;
  border-color: rgb(255 255 255 / 40%);
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  position: relative;
  padding: 0;
  background: #080220;
}

.search-wrapper {
  > div {
    background: rgb(2 1 8 / 75%);
    box-shadow: rgb(255 255 255 / 10%) 0 0 0 1.5px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: rgb(255 255 255 / 75%) 0 0 0 1.5px;
    }

    &:active {
      box-shadow: rgb(255 255 255 / 50%) 0 0 0 1.5px;
    }
  }
}

.animation-wrapper {
  flex: none;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 0;
  left: calc(50% - 100% / 2);
  top: calc(50% - 100vh / 2);
  opacity: 1;
  transform: perspective(1200px);

  .rotating-group {
    border-radius: 31px;
    filter: blur(62px);
    height: 576px;
    left: calc(50% - 30% / 2);
    overflow: visible;
    position: absolute;
    top: calc(52% - 576px / 2);
    width: 31%;
    animation: rotating-group 35s linear infinite;

    .inner1 {
      background: linear-gradient(180deg, #2360ff 0%, #8423ff 100%);
      border-radius: 159px;
      bottom: 249px;
      filter: blur(100px);
      flex: none;
      height: 503px;
      left: -430px;
      overflow: hidden;
      position: absolute;
      width: 683px;
      will-change: transform;
      animation: rotating-group 30s linear infinite;
    }

    .inner2 {
      background: linear-gradient(180deg, #2360ff 0%, #8423ff 100%);
      border-radius: 95px;
      bottom: 23px;
      filter: blur(100px);
      height: 273px;
      left: -228px;
      overflow: hidden;
      position: absolute;
      width: 170px;
      will-change: transform;
      animation: rotating-group 30s linear infinite;
    }
  }

  .rotating-group2 {
    border-radius: 30px;
    filter: blur(62px);
    height: 576px;
    left: calc(50% - 30% / 2);
    overflow: visible;
    position: absolute;
    top: calc(52% - 576px / 2);
    width: 31%;
    animation: rotating-group 40s linear infinite;

    .inner1 {
      background: linear-gradient(140deg, #2360ff 0%, #9f0fff 100%);
      border-radius: 124px;
      bottom: -191px;
      filter: blur(90px);
      height: 537px;
      overflow: hidden;
      position: absolute;
      flex: none;
      right: -434px;
      width: 705px;
      will-change: transform;
      animation: rotating-group 30s linear infinite;
    }

    .inner2 {
      background: linear-gradient(138deg, #2360ff 0%, #8423ff 100%);
      border-radius: 124px;
      bottom: 296px;
      filter: blur(90px);
      height: 306px;
      flex: none;
      overflow: hidden;
      position: absolute;
      right: -266px;
      width: 185px;
      will-change: transform;
      animation: rotating-group 30s linear infinite;
    }
  }
}

.frame {
  background:
    radial-gradient(
      50% 45.7% at 50% 50%,
      #020108 0%,
      rgb(10 10 10 / 0%) 100%
    );
  border-radius: 50%;
  bottom: -2px;
  left: calc(51% - 1004px / 2);
  opacity: 0.9;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 1004px;
  will-change: transform;
}

.bg-wrapper {
  flex: none;
  height: 100%;
  left: calc(50% - 100% / 2);
  opacity: 0.16;
  position: absolute;
  top: calc(50% - 100% / 2);
  width: 100%;
  z-index: 1;

  .inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .bg {
      background: url("@/assets/static.png");
      opacity: 0.1;
      inset: -200%;
      width: 400%;
      height: 400%;
      position: absolute;
      animation: bg 30s linear infinite;
    }
  }
}

@keyframes rotating-group {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes bg {
  0% {
    transform: translateX(0%), translateY(0%);
  }

  25% {
    transform: translateX(10%), translateY(15%);
  }

  50% {
    transform: translateX(17%), translateY(25%);
  }

  75% {
    transform: translateX(-14%), translateY(-10%);
  }

  100% {
    transform: translateX(0%), translateY(0%);
  }
}
</style>