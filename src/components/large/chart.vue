<script>
import { Line } from "vue3-chart-v2";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    };
  },

  mounted() {
    this.$refs.canvas.style.backgroundColor = "#443943";
    this.$refs.canvas.style.width = "30vw";
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient.addColorStop(1, "rgba(0, 231, 255, 0)");
    this.renderChart(
      {
        datasets: [
          {
            label: "example",
            data: [10, 2, 13, 40, 50, 44,],
            backgroundColor: this.gradient,
            pointBackgroundColor: "white",
            pointRadius: 4,
            borderColor: "#dce8e8",
            borderWidth: 1,
          },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          "Red",
          "Yellow",
          "Blue",
          "Green",
          "ops",
          "R"
        ],
      },
      { responsive: false }
    );
  },
};
</script>
