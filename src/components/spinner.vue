<template>
  <div class="spinner-container mt-5">
    <div class="table min-h100 center">
      <div class="table-cell">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" fill="#007bff">
          <circle cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.125s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.25s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.375s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.625s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.75s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.875s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
        </svg>
        <div class="spinner-text mt-3">
          <h5>Authenticating...</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.min-h100 { min-height: 100%; }
.center { text-align: center; }
.table {
  display: table;
  width: 100%;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
}
.spinner-text {
  color: #007bff;
}
</style>
