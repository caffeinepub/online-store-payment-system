import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Item } from '../backend';
import { ExternalBlob } from '../backend';

export function useItems() {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getItems();
    },
    enabled: !!actor && !isFetching
  });
}

export function useAddItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
      image
    }: {
      id: string;
      name: string;
      description: string;
      price: bigint;
      image: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addItem(id, name, description, price, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });
}

export function useDeleteItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });
}

export function useProcessPayment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.processPayment(itemId);
    }
  });
}
