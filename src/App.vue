<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from "@/components/AuthenticatedLayout/AuthenticatedLayout.vue"
</script>

<template>
 <div>
    <AuthenticatedLayout>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <!-- main content -->
                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </AuthenticatedLayout>
   
    <!-- <BaseConfirmation
      v-if="confirmation"
      v-model="confirmation.formData"
      :type="confirmation.type"
      :title="confirmation.title"
      :content="confirmation.content"
      :fields="confirmation.fields"
      :confirmText="confirmation.confirmText"
      :cancelText="confirmation.cancelText"
      :isConfirming="isConfirming"
      @confirmed="confirmation.onConfirm"
      @canceled="confirmation.onCancel"
    />
    <BaseNotification
      v-for="notification in notificationsStore.notifications"
      :key="notification.id"
      v-bind="notification"
      @removed="notificationsStore.remove(notification.id)"
    /> -->
  </div>
</template>

<style scoped>

</style>
