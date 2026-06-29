# Nested Virtualization Problem

Versi Bahasa Indonesia: [disini](./README_ID.md)
A couple of months ago, I try to enabling my virtualization to my Linux Ubuntu from VMWare and it says like `doesn't support virtualization` even though my CPU virtualization is enabled.

## Technical Explanation

So like I mention in the title, this problem is called `Nested Virtualization Problem` and it's used to virtualize OS under virtualized OS as well. So it's running a VM under VM which under real OS. And this is where the problem comes.<br /><br />
In the CPU architecture, there's only one standardized architecture to manage this virtualization and it's called `Protection Ring Architecture` where we protect our system resources at different spaces in our OS. There's only 4 levels of this ring:

1. Ring 0 : The real OS (reserved by running OS)
2. Ring 1 : Device drivers and Hypervisor
3. Ring 2 : Middleware (reserved by running OS)
4. Ring 3 : User Mode App like VMWare or Virtual Box

The problem is the nested virtualization doesn't possible in default mode most of the time. It's usually sits on Ring 3 as it's "sandboxed" from the OS root or admin. This is designed so that if malicious action does not directly affecting the OS performance. But this does not have permission to gain access in lower level of nested virtualization. Nested virtualization is possible only in Ring 1. To do that we need a software called `Hypervisor`. Hypervisor is the software that maintain this nested virtualization by gaining direct access to system resources with full protection to the Host OS. So it's not "sandboxed" anymore, it's embedded to system resource access but isolated from Host OS kernel resources, enabling it to gain maximum resource to run nested virtualization.<br />
Unfortunately, this hypervisor is used for WSL and other Hypervisor VM like Docker if you install one by default. So if you have installed one of those, you're most likely facing this problem. To do that we need to disabled that Hypervisor for WSL. To do that, below is my solution

## Solution

> [!IMPORTANT]
> Pastikan kamu sudah menginstall Node.js versi 18 ke atas sebelum memulai.
> You may or may not undo the action below. Until now I didn't find a way to undo this.
> The action below forced your WSL and other hypervisor VM disabled

1. Activate your CPU virtualization (Intel-VT or AMD-V). It should enabled by default by going on to BIOS. There's many youtube videos solving this problem
2. Try to run the VM if it works, then it's probably because your CPU virtualization is disabled. If the same issue occured, proceed to follow the next steps.
3. Go to gpedit.msc
   > [!WARNING]
   > This last step is the last resort. This can make your device vurnerable. So if you got malicious attack in your VMs, there's high chance your OS Host is also affected.
4. Go open Windows Security and go to this:

```
Windows Security > Device Security > Core Isolation > Core Isolation Details > Memory Integrity
```

You want to uncheck the memory integrity so it can gain access to

## References

[Understanding Ring 0 to Ring 3: The Hidden Layers of Virtualization - Medium](https://medium.com/@leoyeh.me/understanding-ring-0-to-ring-3-the-hidden-layers-of-virtualization-d10e0fe5a798)
[Protection Ring - Wikipedia](https://en.wikipedia.org/wiki/Protection_ring)
