<template>
  <div class="gpu-markets">
    <div v-if="loading" class="loading">Loading GPU markets...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <table v-else class="markets-table">
      <thead>
        <tr>
          <th>GPU Market</th>
          <th>Address</th>
          <th>Price per Hour (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="market in premiumMarkets" :key="market.address">
          <td>{{ market.name }}</td>
          <td>{{ market.address }}</td>
          <td>${{ market.pricePerHour.toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GPUMarkets',
  data() {
    return {
      markets: [],
      loading: true,
      error: null
    };
  },
  computed: {
    premiumMarkets() {
      return this.markets
        .filter(market => market.type === 'PREMIUM')
        .map(market => ({
          ...market,
          pricePerHour: market.usd_reward_per_hour * (1 + market.network_fee_percentage / 100)
        }))
        .sort((a, b) => a.pricePerHour - b.pricePerHour);
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://dashboard.k8s.prd.nos.ci/api/markets');
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }
      this.markets = await response.json();
      this.loading = false;
    } catch (error) {
      this.error = error.message;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.gpu-markets {
  margin: 1rem 0;
}

.markets-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.markets-table th,
.markets-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.markets-table th {
  font-weight: 600;
  background-color: var(--vp-c-bg-soft);
}

.markets-table tbody tr:hover {
  background-color: var(--vp-c-bg-soft);
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
}

.error {
  color: var(--vp-c-danger);
}
</style>

