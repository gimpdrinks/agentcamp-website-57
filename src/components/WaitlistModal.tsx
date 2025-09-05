
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuestProgress } from '@/context/QuestProgressContext';
import { useAudio } from '@/context/AudioContext';
import { submitToWaitlist } from '@/utils/webhookUtils';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Add magic-like opening animation with scale and fade
const dialogContentAnimation =
  "animate-enter transition-transform transition-opacity duration-500";

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type WaitlistModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
};

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, setIsOpen, title, description }) => {
  const { addProgress } = useQuestProgress();
  const { playSound } = useAudio();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitting email to waitlist:', values.email);

    try {
      const result = await submitToWaitlist({
        email: values.email,
        source: 'waitlist-modal'
      });

      if (result.success) {
        toast.success('You have been added to the waitlist!', {
          description: 'We will notify you soon.',
        });
        
        playSound('success', 0.5);
        addProgress('SUBMIT_FINAL_CTA');
        form.reset();
        setIsOpen(false);
      } else {
        toast.error('Failed to join waitlist', {
          description: result.error || 'Please try again later.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`sm:max-w-[425px] bg-card border-primary/50 ${dialogContentAnimation}`}>
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      aria-label="Email address for waitlist"
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Joining...' : 'Join the Waitlist'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
